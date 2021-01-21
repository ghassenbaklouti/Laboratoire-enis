import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from '../app/app-config';
import {Utils} from '../utils/utils';
import {Member} from '../models/memeber.model';
import {Evenement} from '../models/evenement.model';
import {Etudiant} from '../models/etudiant';
import {Enseignant} from '../models/enseignant';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public placeholderMembers: Member[] = GLOBAL._DB.members;
  constructor(
    private httpClient: HttpClient,
  ) {}

  getAllMembers(): Promise<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:9999/membre-service/membres').toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }
  getAllTeachers(): Promise<Enseignant[]> {
    return this.httpClient.get<Enseignant[]>('http://localhost:9999/membre-service/enseignants').toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getMemberById(id: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:9999/membre-service/membre/${id}`).toPromise();

  }
  getFullMemberById(idMember: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:9999/membre-service/fullmember/${idMember}`).toPromise();
  }
  getMemberByEmail(email: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:9999/membre-service/membre/search/email/${email}`).toPromise();
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveMember(member: any): Promise<Member> {
    // return this.httpClient.post<Member>('linkToRestApi', member).toPromise();
    const memberToSave = {
      id: member.id ?? Utils.fakeNumber().toString(),
      createdDate: member.createdDate ?? new Date().toISOString(), ...member
    };
    this.placeholderMembers = [memberToSave, ...this.placeholderMembers.filter(item => item.id !== member.id)];

    return new Promise(resolve => resolve(memberToSave));
  }
  createEtudiant(etudiant: any): Promise<Member> {
    console.log(etudiant);
    console.log(localStorage.getItem('token'));
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<Member>(`http://localhost:9999/membre-service/membres/etudiant`, etudiant, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();

  }
  createEnseignant(enseignant: any): Promise<Member> {
    console.log(enseignant);
    return this.httpClient.post<Member>(`http://localhost:9999/membre-service/membres/enseignant`, enseignant, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();

  }

  removeMemberById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:9999/membre-service/membres/${id}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }

  getStudentsbyEncadrant(enseignant: any): Promise<Member[]> {
    console.log(enseignant);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<Member[]>(`http://localhost:9999/membre-service/students/enseignant`, enseignant, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();

  }
  updateEtudiant(id: string, etudiant: Member): Promise<Member>{
    return this.httpClient.put<Member>(`http://localhost:9999/membre-service/membres/etudiant/${id}`, etudiant, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }
  updateTeacher(id: string, enseignant: Member): Promise<Member>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<Member>(`http://localhost:9999/membre-service/membres/enseignant/${id}`, enseignant, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }

}
