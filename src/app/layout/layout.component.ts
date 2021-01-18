import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  userexist: any;
  username: string;
  constructor(private loginservice: LoginService,
              private memberService: MemberService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginservice.send.subscribe(response => {
                                                  this.loadMember(); });
    console.log(this.userexist);
    this.loadMember();
  }
  logout(): void{
    this.loginservice.logout();
    this.userexist = null;
    this.router.navigate(['./login']);

  }
  loadMember(): void{
    this.userexist = localStorage.getItem('user');
    if (this.userexist){
      this.memberService.getMemberByEmail(this.userexist).then(data => {
        console.log(this.userexist);
        this.username = data?.nom + ' ' + data?.prenom;
        console.log(this.username);
      });
    }
  }

}
