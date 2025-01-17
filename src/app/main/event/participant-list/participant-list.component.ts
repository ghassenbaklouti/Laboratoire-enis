import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {Member} from '../../../../models/memeber.model';
import {MatDialog} from '@angular/material/dialog';
import {EventService} from '../../../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit, OnDestroy {

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  currentItemId: string;
  displayedColumns: string[] = ['id', 'cin', 'nom', 'email', 'cv', 'dateNaissance', 'actions'];
  dataSource: Member[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  form: FormGroup;
  participant: Member;
  userexist: any;
  dataSource2: MatTableDataSource<Member>;
  cin: number ;
  userRole: any;
  memberId: any;
  constructor( private eventService: EventService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.initForm(null);
    this.fetchDataSource();
    this.userexist = localStorage.getItem('user');
    this.userRole = localStorage.getItem('role');
    this.memberId = localStorage.getItem('membreId');
  }

  // tslint:disable-next-line:typedef
  initForm(participant: Member) {
    this.form = new FormGroup({
      cin: new FormControl(participant?.cin, [Validators.required]),
    });
  }

  private fetchDataSource(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    this.eventService.getEventsMembers(this.currentItemId).then(data => {this.dataSource = data;
                                                                         this.dataSource2 = new MatTableDataSource(data);
                                                                         this.dataSource2.paginator = this.paginator;
                                                                         this.dataSource2.sort = this.sort; }).catch((error) => {
      console.log(error);
    });
  }

  onSubmit(): void {
    this.eventService.getMemberbyCin(this.cin.toString()).then(item => {
      this.participant = item;
      console.log(this.participant.id);
      console.log(this.activatedRoute.snapshot.params.id);
      this.eventService.addParticipantToEvent(Number(this.participant.id), this.activatedRoute.snapshot.params.id).then(() =>
        this.fetchDataSource()).catch((error) => {
        console.log(error);
      });
      this.initForm(null); }).catch((error) => {
      console.log(error);
    });

  }
  verifierUser(id: any): boolean{
    for (const auteur of this.dataSource){
      // tslint:disable-next-line:triple-equals
      if (auteur.id == id) {
        return true;
      }
    }
    return false;
  }

  private removeparticipant(memberid: any ): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        // tslint:disable-next-line:max-line-length
        this.eventService.removeParticipantFromEvent(Number(memberid), this.activatedRoute.snapshot.params.id).then(() => this.fetchDataSource()).catch((error) => {
          console.log(error);
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
