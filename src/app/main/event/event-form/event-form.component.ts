import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Evenement} from '../../../../models/evenement.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../../../services/event.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  currentItemId: string;
  item: Evenement;
  form: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private eventService: EventService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.eventService.getEventById(this.currentItemId).then(item => {
        item.date = this.datePipe.transform(item.date, 'yyyy-MM-dd');
        console.log(item.date);
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }

  // tslint:disable-next-line:typedef
  initForm(item: Evenement) {
    this.form = new FormGroup({

      title: new FormControl(item?.title, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      lieu: new FormControl(item?.lieu, [Validators.required]),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    const objectToSubmit: Evenement = {...this.item, ...this.form.value};
    if (!!this.currentItemId) {
      this.eventService.updateEvent(objectToSubmit).then(() => this.router.navigate(['./events']));
    }else {
      console.log(objectToSubmit);
      this.eventService.createEvent(objectToSubmit).then(() => this.router.navigate(['./events']));
    }

  }

}
