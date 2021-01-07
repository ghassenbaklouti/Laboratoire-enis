import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Event} from '../models/event.model';
import {Utils} from '../utils/utils';
import {Member} from "../models/memeber.model";


@Injectable({
  providedIn: 'root'
})
export class EventService {
  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllEvents(): Promise<Event[]> {
    return this.httpClient.get<Event[]>('http://localhost:8081/evenements').toPromise();
  }

  getEventById(id: string): Promise<Event> {
     return this.httpClient.get<Event>(`http://localhost:8081/evenement/${id}`).toPromise();

  }

  updateEvent(event: any): Promise<Event> {
    console.log(event);
    return this.httpClient.put<Event>(`http://localhost:8081/evenements/${event.id}`, event).toPromise();

  }

  createEvent(event: any): Promise<Event> {
    console.log(event);
    return this.httpClient.post<Event>(`http://localhost:8081/evenement/add`, event).toPromise();

  }

  removeEventById(id: string): Promise<void> {
     return this.httpClient.delete<void>(`http://localhost:8081/evenements/${id}`).toPromise();
    // this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
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
}
