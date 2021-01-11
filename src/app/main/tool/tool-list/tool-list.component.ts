import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Tool} from '../../../../models/tool.model';
import {MatDialog} from '@angular/material/dialog';
import {ToolService} from '../../../../services/tool.service';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit, OnDestroy  {

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'CreatedDate', 'Source', 'actions'];
  dataSource: Tool[] = [];

  constructor(private toolService: ToolService,
              private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  private fetchDataSource(): void {
    this.toolService.getAllTools().then(data => this.dataSource = data);
  }

  onRemoveTool(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      // console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.toolService.removeToolById(id).then(() => this.fetchDataSource());
      }
    });
  }

}
