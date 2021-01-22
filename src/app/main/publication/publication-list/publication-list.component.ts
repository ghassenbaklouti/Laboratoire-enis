import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {Publication} from '../../../../models/publication.model';
import {MatDialog} from '@angular/material/dialog';
import {PublicationService} from '../../../../services/publication.service';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Member} from '../../../../models/memeber.model';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit, OnDestroy {

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'title', 'date', 'type', 'lien', 'source', 'actions'];
  dataSource: Publication[] = [];
  dataSource2: MatTableDataSource<Publication>;
  userexist: any;
  userRole: any;
  constructor(private publicationService: PublicationService,
              private dialog: MatDialog) { }
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
    this.publicationService.getAllPublications().then(data => {this.dataSource = data;
                                                               this.dataSource2 = new MatTableDataSource(data);
                                                               this.dataSource2.paginator = this.paginator;
                                                               this.dataSource2.sort = this.sort; }).catch((error) => {
      console.log(error);
    });
  }

  onRemovePublication(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      // console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.publicationService.removePublicationParticipants(id).then().catch((error) => {
          console.log(error);
        });
        this.publicationService.removePublicationById(id).then(() => this.fetchDataSource()).catch((error) => {
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
