import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolService} from '../../../../services/tool.service';
import {Tool} from '../../../../models/tool.model';
import {Evenement} from '../../../../models/evenement.model';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.scss']
})
export class ToolFormComponent implements OnInit {

  currentItemId: string;
  item: Tool;
  form: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private toolService: ToolService) { }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.toolService.getToolById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.initForm(null);
    }
  }

  // tslint:disable-next-line:typedef
  initForm(item: Tool) {
    this.form = new FormGroup({
      date: new FormControl(item?.date, [Validators.required]),
      source: new FormControl(item?.source, [Validators.required]),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    const objectToSubmit: Evenement = {...this.item, ...this.form.value};
    if (!!this.currentItemId) {
      this.toolService.updateTool(objectToSubmit).then(() => this.router.navigate(['./tools'])).catch((error) => {
        console.log(error);
      });
    }else {
      this.toolService.createTool(objectToSubmit).then(() => this.router.navigate(['./tools'])).catch((error) => {
        console.log(error);
      });
    }

  }

}
