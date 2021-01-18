import {EventEmitter, Injectable} from '@angular/core';
import {Member} from '../models/memeber.model';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  send: EventEmitter<any> = new EventEmitter<any>();
  constructor(private httpClient: HttpClient) { }

  login(user: User): any {
    return this.httpClient.post<User>('http://localhost:9999/api/auth/signin', user).toPromise();
  }
  logout(): any {
    localStorage.clear();
  }
  register(user: User): any {
    return this.httpClient.post<User>('http://localhost:9999/api/auth/signup', user).toPromise();
  }

}
