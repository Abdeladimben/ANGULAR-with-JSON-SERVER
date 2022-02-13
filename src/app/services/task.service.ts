import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskI } from '../models/task-i';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiURL="http://localhost:3000/tasks";
  constructor(private http: HttpClient) { }
  findAll(){
    return this.http.get<TaskI[]>(this.apiURL);
  }
  delete(id: string){
    return this.http.delete(this.apiURL+"/"+id)
  }
  presist(task: TaskI){
    return this.http.post<TaskI>(this.apiURL,task);
  }
  completed(id: string,completed: any){
    return this.http.patch(this.apiURL+"/"+id,{completed:!completed})
  }
  update(task:TaskI){
    return this.http.put(this.apiURL+"/"+task.id,task);
  }
}
