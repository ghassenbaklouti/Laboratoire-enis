import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Publication} from '../models/publication.model';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private httpClient: HttpClient) { }

  getAllPublications(): Promise<Publication[]> {
    return this.httpClient.get<Publication[]>('http://localhost:8084/publications').toPromise();
  }
}
