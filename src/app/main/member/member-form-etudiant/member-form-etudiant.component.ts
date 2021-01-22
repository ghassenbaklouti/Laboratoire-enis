import { Component, OnInit } from '@angular/core';
import {Member} from '../../../../models/memeber.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../../../services/member.service';
import {Etudiant} from '../../../../models/etudiant';
import {Publication} from '../../../../models/publication.model';
import {Evenement} from '../../../../models/evenement.model';
import {Tool} from '../../../../models/tool.model';
import {Enseignant} from '../../../../models/enseignant';
import {User} from '../../../../models/user';
import {LoginService} from '../../../../services/login.service';

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
  selectedEncadrant: Enseignant;
  etudiantToSave: any;
  imageSrc: string;
  addForm: FormGroup;
  selectedDiploma: string;
  userSignup: User = new User();
  constructor(private router: Router,
              private loginservice: LoginService,
              private activatedRoute: ActivatedRoute,
              private memberService: MemberService,
  ) { }
  // tslint:disable-next-line:typedef
  get f(){
    return this.addForm.controls;
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.selectedDiploma = item.diplome;
        this.memberService.getAllTeachers().then(data => {this.encadrants = data;
          // tslint:disable-next-line:max-line-length
                                                          this.selectedEncadrant = data.find(encadrant => this.item.encadrant.id === encadrant.id); }).catch((error) => {
          console.log(error);
        });
        this.item = item;
        this.imageSrc = this.item.photo;
        this.initForm(item);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.initForm(null);
    }
    this.memberService.getAllTeachers().then(data => this.encadrants = data).catch((error) => {
      console.log(error);
    });
  }
  // tslint:disable-next-line:typedef
  initForm(item: Member) {
    this.addForm = new FormGroup({
      image: new FormControl(item?.photo, Validators.required),
      imageSrc: new FormControl(item?.photo, Validators.required)
    });
    this.form = new FormGroup({

      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      email: new FormControl({value: item?.email, disabled: this.verifyEditOrCreate()}, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
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
      photo: this.imageSrc,
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
        photo: objectToSubmit.encadrant.photo,
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
    this.userSignup.email = objectToSubmit.email;
    this.userSignup.password = '123456789';
    this.userSignup.username = objectToSubmit.email;
    this.userSignup.role = ['user'];

    if (!!this.currentItemId) {
      // tslint:disable-next-line:max-line-length
      this.memberService.updateEtudiant(this.currentItemId, this.etudiantToSave).then(() => this.router.navigate(['./members'])).catch((error) => {
        console.log(error);
      });
    }else {
      console.log(this.etudiantToSave);
      this.loginservice.register(this.userSignup);
      console.log(this.userSignup);
      this.memberService.createEtudiant(this.etudiantToSave).then(() => this.router.navigate(['./members'])).catch((error) => {
        console.log(error);
      });
    }
  }
  // tslint:disable-next-line:typedef
  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
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

  // tslint:disable-next-line:typedef
  verifyEditOrCreate(){
    if (!! this.activatedRoute.snapshot.params.id){
      return true;
    }else{
      return false;
    }
  }

}
