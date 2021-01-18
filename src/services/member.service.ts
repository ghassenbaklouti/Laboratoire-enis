import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  ) {
  }

  getAllMembers(): Promise<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:8082/membres').toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }
  getAllTeachers(): Promise<Enseignant[]> {
    return this.httpClient.get<Enseignant[]>('http://localhost:8082/enseignants').toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getMemberById(id: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8082//membre/${id}`).toPromise();

  }
  getFullMemberById(idMember: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8082/fullmember/${idMember}`).toPromise();
  }
  getMemberByEmail(email: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8082/membre/search/email/${email}`).toPromise();
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
    return this.httpClient.post<Member>(`http://localhost:8082/membres/etudiant`, etudiant).toPromise();

  }
  createEnseignant(enseignant: any): Promise<Member> {
    console.log(enseignant);
    return this.httpClient.post<Member>(`http://localhost:8082/membres/enseignant`, enseignant).toPromise();

  }

  removeMemberById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:8082/membres/${id}`).toPromise();
  }

  getStudentsbyEncadrant(enseignant: any): Promise<Member[]> {
    console.log(enseignant);
    // @ts-ignore
    return this.httpClient.post<Member[]>(`http://localhost:8082/students/enseignant`, enseignant).toPromise();

  }
  updateEtudiant(id: string, etudiant: Member): Promise<Member>{
    return this.httpClient.put<Member>(`http://localhost:8082/membres/etudiant/${id}`, etudiant).toPromise();
  }
  updateTeacher(id: string, enseignant: Member): Promise<Member>{
    return this.httpClient.put<Member>(`http://localhost:8082/membres/enseignant/${id}`, enseignant).toPromise();
  }

}
