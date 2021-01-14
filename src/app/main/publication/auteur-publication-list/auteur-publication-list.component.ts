import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Member} from '../../../../models/memeber.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PublicationService} from '../../../../services/publication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-auteur-publication-list',
  templateUrl: './auteur-publication-list.component.html',
  styleUrls: ['./auteur-publication-list.component.scss']
})
export class AuteurPublicationListComponent implements OnInit, OnDestroy {

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  currentItemId: string;
  displayedColumns: string[] = ['id', 'cin', 'nom', 'email', 'cv', 'dateNaissance', 'actions'];
  dataSource: Member[] = [];
  form: FormGroup;
  auteur: Member;
  cin: number ;

  constructor(private publicationService: PublicationService,
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
  }
  private fetchDataSource(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    this.publicationService.getPublicationMembers(this.currentItemId).then(data => this.dataSource = data);
  }

    // tslint:disable-next-line:typedef
    initForm(participant: Member) {
      this.form = new FormGroup({
        cin: new FormControl(participant?.cin, [Validators.required]),
      });
    }



    onSubmit(): void {
      this.publicationService.getMemberbyCin(this.cin.toString()).then(item => {
        this.auteur = item;
        console.log(this.auteur.id);
        console.log(this.activatedRoute.snapshot.params.id);
        this.publicationService.addAuteurToPublication(Number(this.auteur.id), this.activatedRoute.snapshot.params.id).then(() =>
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
          this.publicationService.removeAuteurFromPublication(Number(memberid), this.activatedRoute.snapshot.params.id).then(() => this.fetchDataSource());
        }
      });
    }

}
