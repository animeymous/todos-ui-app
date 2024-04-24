import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {

  requestBody: any = {};

  createdDate!: string
  dueDate!: string
  task!: string
  status!: string
  priority!: boolean
  fromEdit!: boolean
  formattedDate!: string

  constructor(private appService: AppService) {}
  ngOnInit(): void {
    const currentDate = new Date();
    this.formattedDate = currentDate.toISOString().split('T')[0];

    if(this.appService.task.fromEdit){
      this.fromEdit = this.appService.task.fromEdit
      this.task = this.appService.task?.task
      this.status = this.appService.task?.status
      this.priority = this.appService.task?.priority
      this.createdDate = this.formatDate(this.appService.task?.createdDate)
      this.dueDate = this.formatDate(this.appService.task?.dueDate)

      this.requestBody['task'] = this.task
      this.requestBody['status'] = this.status
      this.requestBody['priority'] = this.priority
      this.requestBody['createdDate'] = this.createdDate
      this.requestBody['dueDate'] = this.dueDate

      if(this.priority){
        let document = window.document.getElementById("toggle-div")
        if(document){
          document.style.backgroundColor = "red"
        }
  
      }else{
        let document = window.document.getElementById("toggle-div")
        if(document){
          document.style.backgroundColor = "yellow"
        }
      }
    }else{
      this.priority = false
      this.requestBody['priority'] = false
    }
  }

  formatDate(date: any){
    const originalDate = date;
    const formattedDate = new Date(originalDate).toISOString().split('T')[0];
    return formattedDate
  }

  taskFn(event: any){
    this.task = event.target.value
    this.requestBody['task'] = this.task
  }

  statusFn(event: any){
    this.status = event.target.value
    this.requestBody['status'] = this.status
  }

  createdDateFn(event: any){
    this.createdDate = event.target.value
    this.requestBody['createdDate'] = this.createdDate
  }

  dueDateFn(event: any){
    this.dueDate = event.target.value
    this.requestBody['dueDate'] = this.dueDate
  }

  createOrEditTaskFn(){
    if(this.appService.task.fromEdit){
      this.requestBody['_id'] = this.appService.task._id
      this.appService.editTaskFn(this.requestBody).subscribe((response) => {
        console.log(response)
      })

    }else{
      this.appService.createTaskFn(this.requestBody).subscribe((response) => {
        console.log(response)
      })
    }
  }

  priorityFn(event: any){
    if(event.currentTarget.checked === true){
      this.priority = true
      this.requestBody["priority"] = this.priority
      let document = window.document.getElementById("toggle-div")
      if(document){
        document.style.backgroundColor = "red"
      }

    }else{
      this.priority = false
      this.requestBody["priority"] = this.priority
      let document = window.document.getElementById("toggle-div")
      if(document){
        document.style.backgroundColor = "yellow"
      }
    }
  }
}
