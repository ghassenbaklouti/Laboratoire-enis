import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from '../app/app-config';
import {Utils} from '../utils/utils';
import {Member} from '../models/memeber.model';
import {Event} from '../models/event.model';
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
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(
      this.placeholderMembers.filter(item => item.id === id)[0] ?? null
    ));
  }
  getFullMemberById(idMember: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8082/fullmember/${idMember}`).toPromise();
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
  createEtudiant(etudiant: any): Promise<Etudiant> {
    console.log(etudiant);
    return this.httpClient.post<Etudiant>(`http://localhost:8081/membres/etudiant`, etudiant).toPromise();

  }

  removeMemberById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    return new Promise(resolve => resolve());
  }

}
