import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Publication} from '../../../../models/publication.model';
import {MatDialog} from '@angular/material/dialog';
import {PublicationService} from '../../../../services/publication.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit, OnDestroy {

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'title', 'date', 'type', 'source', 'actions'];
  dataSource: Publication[] = [];

  constructor(private publicationService: PublicationService,
              private dialog: MatDialog) { }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }
  private fetchDataSource(): void {
    this.publicationService.getAllPublications().then(data => this.dataSource = data);
  }

}
