import { Component, OnInit } from '@angular/core';
import {Member} from '../../../models/memeber.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {LoginService} from '../../../services/login.service';
import {Router} from '@angular/router';
import {MemberService} from '../../../services/member.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  item: User = new User();
  form: FormGroup;
  constructor(private loginservice: LoginService,
              private membreservice: MemberService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm(null);
  }

  // tslint:disable-next-line:typedef
  initForm(item: User) {
    this.form = new FormGroup({

      email: new FormControl(item?.email, [Validators.required]),
      password: new FormControl(item?.password, [Validators.required]),
    });
  }
  onSubmit(): void {
    this.item.email = this.form.value.email;

    this.item.password = this.form.value.password;

    this.item.username = this.form.value.email;
    this.loginservice.login(this.item).then(res => {
      this.membreservice.getMemberByEmail(res.email).then(data =>{
        localStorage.setItem('membreId', data.id);
      });
      console.log(res);
      localStorage.setItem('user', res.email);
      localStorage.setItem('role', res.roles);
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('userid', res.id);
      this.loginservice.send.emit();
    });
    this.router.navigate(['./dashboard']);
  }

}
