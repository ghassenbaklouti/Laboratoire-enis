import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tool} from '../models/tool.model';
import {Member} from "../models/memeber.model";


@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private httpClient: HttpClient) { }

  getAllTools(): Promise<Tool[]> {
    return this.httpClient.get<Tool[]>('http://localhost:8083/outils').toPromise();
  }

  getToolById(id: string): Promise<Tool> {
    return this.httpClient.get<Tool>(`http://localhost:8083/outil/${id}`).toPromise();

  }

  createTool(tool: any): Promise<Tool> {
    return this.httpClient.post<Tool>(`http://localhost:8083/outil/add`, tool).toPromise();

  }

  updateTool(tool: any): Promise<Tool> {
    return this.httpClient.put<Tool>(`http://localhost:8083/outils/${tool.id}`, tool).toPromise();

  }

  removeToolById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:8083/outils/${id}`).toPromise();
  }

  getMemberbyCin(cin: string): Promise<Member> {
    return this.httpClient.get<Member>(`http://localhost:8082/membre/search/cin/${cin}`).toPromise();
  }

  getToolMembers(id: string): Promise<Member[]> {
    return this.httpClient.get<Member[]>(`http://localhost:8082/membres/outil/${id}`).toPromise();
  }

  addAuteurToTool(idauteur: number, idoutil: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:8082/membres/outil/addAuteur`, {outil_id : idoutil, utilisateur_id: idauteur}).toPromise();
  }

  removeAuteurFromTool(idauteur: number, idoutil: number): Promise<void>{
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<void>(`http://localhost:8082/membres/outil/removeAuteur`, {outil_id : idoutil, utilisateur_id: idauteur}).toPromise();
  }
}
