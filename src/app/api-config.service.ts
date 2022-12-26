import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import taskListModel from './models/taskListModel';
import taskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  // get API call to backend
  get(url: string) {
    return this.httpClient.get<taskListModel[]>(`${this.API_BASE_URL}/${url}`);
  }

  getTasks(url: string) {
    return this.httpClient.get<taskModel[]>(`${this.API_BASE_URL}/${url}`);
  }

  post(url: string, data: Object){
    return this.httpClient.post<taskListModel>(`${this.API_BASE_URL}/${url}`, data);
  }

  put(url: string, data: Object){
    return this.httpClient.put(`${this.API_BASE_URL}/${url}`, data);
  }

  delete(url: string){
    return this.httpClient.delete<taskListModel>(`${this.API_BASE_URL}/${url}`);
  }

  deleteTask(url: string){
    return this.httpClient.delete<taskModel>(`${this.API_BASE_URL}/${url}`);
  }
}
