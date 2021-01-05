import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tool} from '../models/tool.model';


@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private httpClient: HttpClient) { }

  getAllTools(): Promise<Tool[]> {
    return this.httpClient.get<Tool[]>('http://localhost:8083/outils').toPromise();
  }
}
