import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Event} from '../../../../models/event.model';
import {MatDialog} from '@angular/material/dialog';
import {EventService} from '../../../../services/event.service';


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



}
