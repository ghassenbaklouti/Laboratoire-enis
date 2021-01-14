import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Event} from '../../../../models/event.model';
import {MatDialog} from '@angular/material/dialog';
import {EventService} from '../../../../services/event.service';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'title', 'lieu', 'date', 'actions'];
  dataSource: Event[] = [];

  constructor(private eventService: EventService,
              private dialog: MatDialog) { }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  private fetchDataSource(): void {
    this.eventService.getAllEvents().then(data => this.dataSource = data);
  }

  onRemoveEvent(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      // console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.eventService.removeEventParticipants(id).then();
        this.eventService.removeEventById(id).then(() => this.fetchDataSource());
      }
    });
  }



}
