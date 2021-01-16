import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Evenement} from '../models/evenement.model';
import {Member} from '../models/memeber.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private httpClient: HttpClient) { }

  getAllEvents(): Promise<Evenement[]> {
    return this.httpClient.get<Evenement[]>('http://localhost:8081/evenements').toPromise();
  }

  getEventById(id: string): Promise<Evenement> {
     return this.httpClient.get<Evenement>(`http://localhost:8081/evenement/${id}`).toPromise();

  }

  updateEvent(event: any): Promise<Evenement> {
    console.log(event);
    return this.httpClient.put<Evenement>(`http://localhost:8081/evenements/${event.id}`, event).toPromise();

  }

  createEvent(event: any): Promise<Evenement> {
    console.log(event);
    return this.httpClient.post<Evenement>(`http://localhost:8081/evenement/add`, event).toPromise();

  }

  removeEventById(id: string): Promise<void> {
     return this.httpClient.delete<void>(`http://localhost:8081/evenements/${id}`).toPromise();
  }

  getEventsMembers(id: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8082/membres/event/${id}`).toPromise();
    // return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getMemberbyCin(cin: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8082/membre/search/cin/${cin}`).toPromise();
  }

  addParticipantToEvent(idparticipant: number, idevent: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:8082/membres/event/addParticipant`, {evenement_id : idevent, organisateur_id: idparticipant}).toPromise();
  }

  removeParticipantFromEvent(idparticipant: number, idevent: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:8082/membres/event/removeParticipant`, {evenement_id : idevent, organisateur_id: idparticipant}).toPromise();
  }
  removeEventParticipants(idevent: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:8082/member/event/delete/${idevent}`).toPromise();
  }

}
