import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemberService} from '../../../../services/member.service';
import {Member} from '../../../../models/memeber.model';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {EventService} from '../../../../services/event.service';
import {ToolService} from '../../../../services/tool.service';
import {Router} from '@angular/router';
import {PublicationService} from '../../../../services/publication.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LoginService} from "../../../../services/login.service";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'cin', 'nom', 'email', 'cv', 'dateNaissance', 'actions'];
  dataSource: Member[] = [];
  memberToDelete: Member;
  students: Member[];
  dataSource2: MatTableDataSource<Member>;
  userexist: any;
  userRole: any;
  userToDelete: User;


  constructor(
    private router: Router,
    private memberService: MemberService,
    private eventService: EventService,
    private toolService: ToolService,
    private publicationService: PublicationService,
    private dialog: MatDialog,
    private loginService: LoginService
  ) { }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
    this.userexist = localStorage.getItem('user');
    this.userRole = localStorage.getItem('role');
  }

  private fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {this.dataSource = data;
                                                     this.dataSource2 = new MatTableDataSource(data);
                                                     this.dataSource2.paginator = this.paginator;
                                                     this.dataSource2.sort = this.sort; });
  }
  redirectToEdit(element: any): void {
    console.log(element.id);
    if (element.grade != null){
      console.log('Encadrant');
      console.log(element.id);
      this.router.navigate([`./members/editEncadrant/${Number(element.id)}`]);
    }
    if (element.diplome != null){
      console.log('Etudiant');
      this.router.navigate([`./members/editEtudiant/${Number(element.id)}`]);
    }

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
            if ( this.memberToDelete.events || this.memberToDelete.outils || this.memberToDelete.pubs)
            {

              for (const item of this.memberToDelete.events){
                await this.eventService.removeParticipantFromEvent(id, Number(item.id));

              }
              for (const item1 of this.memberToDelete.outils){
                await this.toolService.removeAuteurFromTool(Number(id), Number(item1.id));

              }
              for (const item1 of this.memberToDelete.pubs){
                 await this.publicationService.removeAuteurFromPublication(Number(id), Number(item1.id));

              }
              this.userToDelete =   await this.loginService.getUserByEmail(this.memberToDelete.email);
              await this.loginService.removeUserById(this.userToDelete.id);
              this.memberService.removeMemberById(id).then(() => this.fetchDataSource());
            }
          }else {
            console.log('cannot delete teacher !');
          }
        });
      }
    });
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
}
