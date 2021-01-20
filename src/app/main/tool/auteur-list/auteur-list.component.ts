import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {Member} from '../../../../models/memeber.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ToolService} from '../../../../services/tool.service';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-auteur-list',
  templateUrl: './auteur-list.component.html',
  styleUrls: ['./auteur-list.component.scss']
})
export class AuteurListComponent implements OnInit, OnDestroy {

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  currentItemId: string;
  displayedColumns: string[] = ['id', 'cin', 'nom', 'email', 'cv', 'dateNaissance', 'actions'];
  dataSource: Member[] = [];
  form: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource2: MatTableDataSource<Member>;
  auteur: Member;
  userexist: any;
  cin: number ;

  constructor(private toolService: ToolService,
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
  }

  // tslint:disable-next-line:typedef
  initForm(participant: Member) {
    this.form = new FormGroup({
      cin: new FormControl(participant?.cin, [Validators.required]),
    });
  }

  private fetchDataSource(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    this.toolService.getToolMembers(this.currentItemId).then(data => {this.dataSource = data;
                                                                      this.dataSource2 = new MatTableDataSource(data);
                                                                      this.dataSource2.paginator = this.paginator;
                                                                      this.dataSource2.sort = this.sort; });
  }

  onSubmit(): void {
    this.toolService.getMemberbyCin(this.cin.toString()).then(item => {
      this.auteur = item;
      console.log(this.auteur.id);
      console.log(this.activatedRoute.snapshot.params.id);
      this.toolService.addAuteurToTool(Number(this.auteur.id), this.activatedRoute.snapshot.params.id).then(() =>
        this.fetchDataSource());
      this.initForm(null); });

  }

  private removeauteur(memberid: any ): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        // tslint:disable-next-line:max-line-length
        this.toolService.removeAuteurFromTool(Number(memberid), this.activatedRoute.snapshot.params.id).then(() => this.fetchDataSource());
      }
    });
  }
  // tslint:disable-next-line:typedef
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
