import {EventEmitter, Injectable} from '@angular/core';
import {Member} from '../models/memeber.model';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  removeUserById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:9999/api/auth/deleteUser/${id}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }

  getUserByEmail(email: string): Promise<User> {
    return this.httpClient.get<User>(`http://localhost:9999/api/auth/user/email/${email}`).toPromise();
  }

}
