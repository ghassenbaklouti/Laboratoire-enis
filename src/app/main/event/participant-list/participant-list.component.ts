import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Member} from '../../../../models/memeber.model';
import {MatDialog} from '@angular/material/dialog';
import {EventService} from '../../../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  form: FormGroup;
  participant: Member;
  cin: number ;
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
  }

  // tslint:disable-next-line:typedef
  initForm(participant: Member) {
    this.form = new FormGroup({
      cin: new FormControl(participant?.cin, [Validators.required]),
    });
  }

  private fetchDataSource(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    this.eventService.getEventsMembers(this.currentItemId).then(data => this.dataSource = data);
  }

  onSubmit(): void {
    this.eventService.getMemberbyCin(this.cin.toString()).then(item => {
      this.participant = item;
      console.log(this.participant.id);
      console.log(this.activatedRoute.snapshot.params.id);
      this.eventService.addParticipantToEvent(Number(this.participant.id), this.activatedRoute.snapshot.params.id).then(() =>
        this.fetchDataSource());
      this.initForm(null); });

  }
}
