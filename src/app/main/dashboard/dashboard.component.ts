import { Component, OnInit } from '@angular/core';
import {MemberService} from '../../../services/member.service';
import {PublicationService} from '../../../services/publication.service';
import {ToolService} from '../../../services/tool.service';
import {EventService} from '../../../services/event.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'Enis21 Lab';
  toolsList: any;
  memberList: any;
  publicationList: any;
  eventsList: any;
  EtList: any;
  EnsList: any;
  constructor(private membreservice: MemberService,
              private router: Router,
              private publicationservice: PublicationService,
              private toolservice: ToolService,
              private eventService: EventService) { }

  ngOnInit(): void {
    this.membreservice.getAllMembers().then(data => {
      this.memberList = data.length;
    });
    this.eventService.getAllEvents().then(data => {
      this.eventsList = data.length;
    });
    this.publicationservice.getAllPublications().then(data => {
      this.publicationList = data.length;
    });
    this.toolservice.getAllTools().then(data => {
      this.toolsList = data.length;
    });
    this.membreservice.getAllTeachers().then(data => {
      this.EnsList = data.length;
    });
    this.membreservice.getAllStudents().then(data => {
      this.EtList = data.length;
    });
  }
  redirectToMembers(): void{
    this.router.navigate(['./members']);
  }
  redirectTotools(): void{
    this.router.navigate(['./tools']);
  }
  redirectTopublication(): void{
    this.router.navigate(['./articles']);
  }
  redirectToevents(): void{
    this.router.navigate(['./events']);
  }

}
