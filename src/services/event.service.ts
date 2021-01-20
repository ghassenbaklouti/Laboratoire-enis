import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Evenement} from '../models/evenement.model';
import {Member} from '../models/memeber.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private httpClient: HttpClient) { }

  getAllEvents(): Promise<Evenement[]> {
    return this.httpClient.get<Evenement[]>('http://localhost:9999/evenement-service/evenements').toPromise();
  }

  getEventById(id: string): Promise<Evenement> {
     return this.httpClient.get<Evenement>(`http://localhost:9999/evenement-service/evenement/${id}`).toPromise();

  }

  updateEvent(event: any): Promise<Evenement> {
    console.log(event);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<Evenement>(`http://localhost:9999/evenement-service/evenements/${event.id}`, event, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();

  }

  createEvent(event: any): Promise<Evenement> {
    console.log(event);
    return this.httpClient.post<Evenement>(`http://localhost:9999/evenement-service/evenement/add`, event, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();

  }

  removeEventById(id: string): Promise<void> {
     return this.httpClient.delete<void>(`http://localhost:9999/evenement-service/evenements/${id}`, {headers: new HttpHeaders({
         Authorization: 'Bearer ' + localStorage.getItem('token')
       })}).toPromise();
  }

  getEventsMembers(id: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:9999/membre-service/membres/event/${id}`).toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getMemberbyCin(cin: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:9999/membre-service/membre/search/cin/${cin}`).toPromise();
  }

  addParticipantToEvent(idparticipant: number, idevent: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:9999/membre-service/membres/event/addParticipant`, {evenement_id : idevent, organisateur_id: idparticipant}, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }

  removeParticipantFromEvent(idparticipant: number, idevent: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:9999/membre-service/membres/event/removeParticipant`, {evenement_id : idevent, organisateur_id: idparticipant}, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }
  removeEventParticipants(idevent: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:9999/membre-service/member/event/delete/${idevent}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }

}
