import { Component, OnInit } from '@angular/core';
import { TaskI } from 'src/app/models/task-i';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  searchText="";

  showForm=false;
  editForm=false;

  tasks:TaskI[]=[];
  resultTask:TaskI[]=[];
  myTasks:TaskI= {
    label: "",
    completed:false
  };
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(){
    this.taskService.findAll().subscribe(task=> {
      this.resultTask=this.tasks=task
    });
  }
  deleteTask(id:any){
    this.taskService.delete(id).subscribe(()=>{
      this.tasks =this.tasks.filter(task=>task.id!=id)
    })
  }
  persistTask(){
    this.taskService.presist(this.myTasks)
    .subscribe((task)=>{
      this.tasks=[task,... this.tasks]
    })
    this.resetTask();
  }
  resetTask(){
    this.myTasks={
      label:"",
      completed:false
    }
  }

  toogleCompleted(id:any,task:TaskI){
    this.taskService.completed(id,task.completed)
      .subscribe(()=>{
        task.completed = !task.completed;
      })
  }
  editTask(task: TaskI){
    this.myTasks=task;
    this.editForm=true;
  }
  updateTask(){
    this.taskService.update(this.myTasks)
      .subscribe(task =>{
        this.resetTask();
        this.editForm=false;
        
      })
  }
  searchTask(){
    this.resultTask=this.tasks.filter(task => task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }

}
