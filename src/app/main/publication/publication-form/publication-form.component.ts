import { Component, OnInit } from '@angular/core';
import {Tool} from '../../../../models/tool.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolService} from '../../../../services/tool.service';
import {Event} from '../../../../models/event.model';
import {PublicationService} from '../../../../services/publication.service';
import {Publication} from '../../../../models/publication.model';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {

  currentItemId: string;
  item: Publication;
  form: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.publicationService.getPublicationById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }

  // tslint:disable-next-line:typedef
  initForm(item: Publication) {
    this.form = new FormGroup({
      date: new FormControl(item?.date, [Validators.required]),
      sourcePdf: new FormControl(item?.sourcePdf, [Validators.required]),
      type: new FormControl(item?.type, [Validators.required]),
      lien: new FormControl(item?.lien, [Validators.required]),
      title: new FormControl(item?.title, [Validators.required]),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    const objectToSubmit: Publication = {...this.item, ...this.form.value};
    if (!!this.currentItemId) {
      this.publicationService.updatePublication(objectToSubmit).then(() => this.router.navigate(['./articles']));
    }else {
      this.publicationService.createPublication(objectToSubmit).then(() => this.router.navigate(['./articles']));
    }
    console.log(objectToSubmit);

  }

}
