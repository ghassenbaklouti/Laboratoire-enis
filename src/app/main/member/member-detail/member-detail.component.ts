import { Component, OnInit } from '@angular/core';
import {Member} from '../../../../models/memeber.model';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../../../services/member.service';
import {Publication} from '../../../../models/publication.model';
import {Evenement} from '../../../../models/evenement.model';
import {Tool} from '../../../../models/tool.model';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  panelOpenState = false;
  currentItemId: string;
  membreId: any;
  item: Member = {
    id: null,
    cin: null,
    nom: null,
    prenom: null,
    date: null,
    photo: null,
    cv: null,
    email: null,
    password: null,
    pubs: null,
    events: null,
    outils: null,
    encadrant: null,
    diplome: null,
    grade: null,
    dateInscription: null,
    etablissement: null,
  };
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private memberService: MemberService,
              ) { }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    this.membreId = localStorage.getItem('membreId');
    if (!!this.currentItemId) {
      this.memberService.getFullMemberById(this.currentItemId).then(item => {
        this.item = item;
        console.log(this.item);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.item = null;
    }

  }
  redirectToEdit(element: any): void {
    console.log(element.id);
    if (element.grade != null){
      this.router.navigate([`./members/editEncadrant/${Number(element.id)}`]);
    }
    if (element.diplome != null){
      this.router.navigate([`./members/editEtudiant/${Number(element.id)}`]);
    }

  }

}
