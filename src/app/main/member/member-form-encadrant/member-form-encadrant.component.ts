import { Component, OnInit } from '@angular/core';
import {Member} from '../../../../models/memeber.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../../../services/member.service';

@Component({
  selector: 'app-member-form-encadrant',
  templateUrl: './member-form-encadrant.component.html',
  styleUrls: ['./member-form-encadrant.component.scss']
})
export class MemberFormEncadrantComponent implements OnInit {
  currentItemId: string;
  item: Member;
  form: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private memberService: MemberService,
              ) { }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }
  // tslint:disable-next-line:typedef
  initForm(item: Member) {
    this.form = new FormGroup({

      cin: new FormControl(item?.cin, [Validators.required]),
      First_Name: new FormControl(item?.nom, [Validators.required]),
      Last_Name: new FormControl(item?.prenom, [Validators.required]),
      Birth_Date: new FormControl(item?.date, [Validators.required]),
      Email: new FormControl(item?.email, [Validators.required]),
      Grade: new FormControl(item?.grade, [Validators.required]),
      Etablissement: new FormControl(item?.etablissement, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
      picture: new FormControl(item?.photo, [Validators.required]),
    });
  }
  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }
  onSubmit(): void {
    const objectToSubmit: Member = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.memberService.saveMember(objectToSubmit).then(() => this.router.navigate(['./members']));

  }

}
