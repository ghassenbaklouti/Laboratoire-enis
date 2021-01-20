import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Publication} from '../models/publication.model';
import {Tool} from '../models/tool.model';
import {Member} from '../models/memeber.model';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private httpClient: HttpClient) { }

  getAllPublications(): Promise<Publication[]> {
    return this.httpClient.get<Publication[]>('http://localhost:9999/publication-service/publications').toPromise();
  }
  getPublicationById(id: string): Promise<Publication> {
    return this.httpClient.get<Publication>(`http://localhost:9999/publication-service/publications/${id}`).toPromise();

  }

  createPublication(publication: any): Promise<Publication> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<Publication>(`http://localhost:9999/publication-service/publication/add`, publication, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();

  }

  updatePublication(publication: any): Promise<Publication> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<Publication>(`http://localhost:9999/publication-service/publication/${publication.id}`, publication, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();

  }

  removePublicationById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:9999/publication-service/publications/${id}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }
  getPublicationMembers(id: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:9999/membre-service/membres/publication/${id}`).toPromise();
  }

  getMemberbyCin(cin: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:9999/membre-service/membre/search/cin/${cin}`).toPromise();
  }
  addAuteurToPublication(idauteur: number, idpublication: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:9999/membre-service/membres/publication/addAuteur`, {publication_id : idpublication, auteur_id: idauteur}, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }

  removeAuteurFromPublication(idauteur: number, idpublication: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:9999/membre-service/membres/publication/removeAuteur`, {publication_id : idpublication, auteur_id: idauteur}, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }
  removePublicationParticipants(idpublication: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:9999/membre-service/member/publication/delete/${idpublication}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }
}
