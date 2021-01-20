import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tool} from '../models/tool.model';
import {Member} from '../models/memeber.model';


@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private httpClient: HttpClient) { }

  getAllTools(): Promise<Tool[]> {
    return this.httpClient.get<Tool[]>('http://localhost:9999/outil-service/outils').toPromise();
  }

  getToolById(id: string): Promise<Tool> {
    return this.httpClient.get<Tool>(`http://localhost:9999/outil-service/outil/${id}`).toPromise();

  }

  createTool(tool: any): Promise<Tool> {
    return this.httpClient.post<Tool>(`http://localhost:9999/outil-service/outil/add`, tool, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();

  }

  updateTool(tool: any): Promise<Tool> {
    return this.httpClient.put<Tool>(`http://localhost:9999/outil-service/outils/${tool.id}`, tool, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();

  }

  removeToolById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:9999/outil-service/outils/${id}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }

  getMemberbyCin(cin: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:9999/membre-service/membre/search/cin/${cin}`).toPromise();
  }

  getToolMembers(id: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:9999/membre-service/membres/outil/${id}`).toPromise();
  }

  addAuteurToTool(idauteur: number, idoutil: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:9999/membre-service/membres/outil/addAuteur`, {outil_id : idoutil, utilisateur_id: idauteur}, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }

  removeAuteurFromTool(idauteur: number, idoutil: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:9999/membre-service/membres/outil/removeAuteur`, {outil_id : idoutil, utilisateur_id: idauteur}, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }
  removeToolParticipants(idOutil: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete<void>(`http://localhost:9999/membre-service/member/outil/delete/${idOutil}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })}).toPromise();
  }
}
