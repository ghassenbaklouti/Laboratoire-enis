import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from '../../../../services/member.service';
import {Member} from '../../../../models/memeber.model';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {EventService} from '../../../../services/event.service';
import {ToolService} from '../../../../services/tool.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'cin', 'nom', 'email', 'cv', 'dateNaissance', 'actions'];
  dataSource: Member[] = [];
  memberToDelete: Member;
  students: Member[];


  constructor(
    private memberService: MemberService,
    private eventService: EventService,
    private toolService: ToolService,
    private dialog: MatDialog,
  ) { }


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  private fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => this.dataSource = data);
  }

  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(async isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.memberToDelete =   await this.memberService.getFullMemberById(id);
        this.memberService.getStudentsbyEncadrant(this.memberToDelete).then(async data => {
          this.students = data;
          console.log(data.length);
          if (data.length === 0) {
            if ( this.memberToDelete.events || this.memberToDelete.outils )
            {

              for (const item of this.memberToDelete.events){
                await this.eventService.removeParticipantFromEvent(id, Number(item.id));

              }
              for (const item1 of this.memberToDelete.outils){
                await this.toolService.removeAuteurFromTool(Number(id), Number(item1.id));

              }
              /* for (const item1 of this.memberToDelete.pubs){
                 await this.toolService.removeAuteurFromTool(Number(id), Number(item1.id));

              }*/
              this.memberService.removeMemberById(id).then(() => this.fetchDataSource());
            }
          }else {
            console.log('cannot delete teacher !');
          }
        });
      }
    });
  }
}
