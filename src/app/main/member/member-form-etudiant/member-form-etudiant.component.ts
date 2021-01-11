import { Component, OnInit } from '@angular/core';
import {Member} from '../../../../models/memeber.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../../../services/member.service';
import {Etudiant} from '../../../../models/etudiant';
import {Publication} from '../../../../models/publication.model';
import {Event} from '../../../../models/event.model';
import {Tool} from '../../../../models/tool.model';
import {Enseignant} from '../../../../models/enseignant';

@Component({
  selector: 'app-member-form-etudiant',
  templateUrl: './member-form-etudiant.component.html',
  styleUrls: ['./member-form-etudiant.component.scss']
})
export class MemberFormEtudiantComponent implements OnInit {
  encadrants: Enseignant[];
  currentItemId: string;
  item: Member;
  form: FormGroup;
  etudiantToSave: any;
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
    this.memberService.getAllTeachers().then(data => this.encadrants = data);
  }
  // tslint:disable-next-line:typedef
  initForm(item: Member) {
    this.form = new FormGroup({

      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      email: new FormControl(item?.email, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
      photo: new FormControl(item?.photo, [Validators.required]),
      diplome: new FormControl(item?.diplome, [Validators.required]),
      dateInscription: new FormControl(item?.dateInscription, [Validators.required]),
      encadrant: new FormControl(item?.encadrant, [Validators.required]),
    });
  }
  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }
  onSubmit(): void {
    const objectToSubmit: Member = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.etudiantToSave = {
      cin: objectToSubmit.cin,
      nom: objectToSubmit.nom,
      prenom: objectToSubmit.prenom,
      date: objectToSubmit.date,
      photo: null,
      cv: objectToSubmit.cv,
      email: objectToSubmit.email,
      password: objectToSubmit.password,
      pubs: [],
      events: [],
      outils: [],
      dateInscription: objectToSubmit.dateInscription,
      diplome: objectToSubmit.diplome,
      encadrant: {
        id: objectToSubmit.encadrant.id,
        cin: objectToSubmit.encadrant.cin,
        nom: objectToSubmit.encadrant.nom,
        prenom: objectToSubmit.encadrant.prenom,
        date: objectToSubmit.encadrant.date,
        photo: null,
        cv: objectToSubmit.encadrant.cv,
        email: objectToSubmit.encadrant.email,
        password: objectToSubmit.encadrant.password,
        pubs: null,
        events: null,
        outils: null,
        grade: objectToSubmit.encadrant.grade,
        etablissement: objectToSubmit.encadrant.etablissement
      }
    };
    console.log(this.etudiantToSave);
    this.memberService.createEtudiant(this.etudiantToSave).then(() => this.router.navigate(['./members']));

  }

}
