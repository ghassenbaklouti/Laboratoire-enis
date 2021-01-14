import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Publication} from '../models/publication.model';
import {Tool} from '../models/tool.model';
import {Member} from '../models/memeber.model';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private httpClient: HttpClient) { }

  getAllPublications(): Promise<Publication[]> {
    return this.httpClient.get<Publication[]>('http://localhost:8084/publications').toPromise();
  }
  getPublicationById(id: string): Promise<Publication> {
    return this.httpClient.get<Publication>(`http://localhost:8084/publications/${id}`).toPromise();

  }

  createPublication(publication: any): Promise<Publication> {
    return this.httpClient.post<Publication>(`http://localhost:8084/publication/add`, publication).toPromise();

  }

  updatePublication(publication: any): Promise<Publication> {
    return this.httpClient.put<Publication>(`http://localhost:8084/publication/${publication.id}`, publication).toPromise();

  }

  removePublicationById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:8084/publications/${id}`).toPromise();
  }
  getPublicationMembers(id: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8082/membres/publication/${id}`).toPromise();
  }

  getMemberbyCin(cin: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8082/membre/search/cin/${cin}`).toPromise();
  }
  addAuteurToPublication(idauteur: number, idpublication: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:8082/membres/publication/addAuteur`, {publication_id : idpublication, auteur_id: idauteur}).toPromise();
  }

  removeAuteurFromPublication(idauteur: number, idpublication: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:8082/membres/publication/removeAuteur`, {publication_id : idpublication, auteur_id: idauteur}).toPromise();
  }
  removePublicationParticipants(idpublication: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:8082/member/publication/delete/${idpublication}`).toPromise();
  }
}
