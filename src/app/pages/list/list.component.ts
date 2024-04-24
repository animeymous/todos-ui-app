import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { verifyHostBindings } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(private appService: AppService, private router: Router){}

  lists: any;
  emptyList: boolean | undefined;
  countOfUnCompletedTask: number = 0

  ngOnInit(): void {
    this.appService.getAllTaskFn().subscribe((data: any) => {

      if(data?.response?.length > 0){
        this.emptyList = false
        this.lists = data?.response

        for(let i = 0; i < this.lists.length; i++){
          if(this.lists[i]['status'] === "pending" || this.lists[i]['status'] === "doing"){
            this.countOfUnCompletedTask++
          }
        }

        console.log(this.countOfUnCompletedTask)

      }else{
        this.emptyList = true
      }
      // this.lists = []
    })
  }

  handleTaskClick(task: any) {
    console.log('Clicked task:', task);
    // You can perform further actions with the task object here
  }

  editTask(task: any) {
    task['fromEdit'] = true;
    this.appService.task = task;
    this.router.navigateByUrl("/task")
  }

  deleteTask(task: any) {
    this.appService.deleteTaskFn(task).subscribe((response) => {
      window.location.reload()
    })
  }

  createTaskFn(){
    this.appService.task = {fromEdit : false}
    this.router.navigateByUrl("/task")
  }

  completedTaskFn(){
    this.router.navigateByUrl("/completed")
  }

}
