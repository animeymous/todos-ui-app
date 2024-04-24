import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = "http://localhost:3000"
  constructor(private httpClient: HttpClient) {}

  task: any;

  set taskFn(task){
    this.task = task
  }
  
  get taskFn(){
    return this.task
  }

  getAllTaskFn(){
    return this.httpClient.get(`${this.url}/getAllTask`)
  }

  createTaskFn(requestBody: any){
    return this.httpClient.post(`${this.url}/createTask`, requestBody)
  }

  editTaskFn(requestBody: any){
    return this.httpClient.put(`${this.url}/editTask/${requestBody._id}`, requestBody)
  }

  deleteTaskFn(requestBody: any){
    return this.httpClient.delete(`${this.url}/deleteTask/${requestBody._id}`)
  }
}
