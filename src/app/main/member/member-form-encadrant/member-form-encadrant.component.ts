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
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private memberService: MemberService,
              ) { }


  // tslint:disable-next-line:typedef
  get f(){
    return this.addForm.controls;
  }
  currentItemId: string;
  item: Member;
  form: FormGroup;
  enseignantToSave: any;
  imageSrc: string;
  addForm: FormGroup;

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    console.log(this.currentItemId);
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.item = item;

        this.imageSrc = this.item.photo;
        this.initForm(item);
        console.log(item);
      });
    } else {
      this.initForm(null);
    }
  }
  // tslint:disable-next-line:typedef
  initForm(item: Member) {
    this.addForm = new FormGroup({
      image: new FormControl(item?.photo, Validators.required),
      imageSrc: new FormControl(item?.photo, Validators.required)
    })
    this.form = new FormGroup({

      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      email: new FormControl(item?.email, [Validators.required]),
      grade: new FormControl(item?.grade, [Validators.required]),
      etablissement: new FormControl(item?.etablissement, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
    });
  }
  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }
  onSubmit(): void {
    const objectToSubmit: Member = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.enseignantToSave = {
        id: objectToSubmit.id,
        cin: objectToSubmit.cin,
        nom: objectToSubmit.nom,
        prenom: objectToSubmit.prenom,
        date: objectToSubmit.date,
        photo: this.imageSrc,
        cv: objectToSubmit.cv,
        email: objectToSubmit.email,
        password: objectToSubmit.password,
        pubs: null,
        events: null,
        outils: null,
        grade: objectToSubmit.grade,
        etablissement: objectToSubmit.etablissement
    };


    if (!!this.currentItemId) {
      this.memberService.updateTeacher(this.currentItemId, this.enseignantToSave).then(() => this.router.navigate(['./members']));
    }else {
      this.memberService.createEnseignant(this.enseignantToSave).then(() => this.router.navigate(['./members']));
    }
  }

  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.addForm.patchValue({
          imageSrc: reader.result
        });

      };

    }
  }

}
