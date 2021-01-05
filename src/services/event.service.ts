import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Event} from '../models/event.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }

  getAllEvents(): Promise<Event[]> {
    return this.httpClient.get<Event[]>('http://localhost:8081/evenements').toPromise();
  }
}
