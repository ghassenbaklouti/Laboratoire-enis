import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../../../../services/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Member} from '../../../../models/memeber.model';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  currentItemId: string;
  item: Member;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {
  }

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
      name: new FormControl(item?.nom, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
      type: new FormControl(item?.nom, [Validators.required]),
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
