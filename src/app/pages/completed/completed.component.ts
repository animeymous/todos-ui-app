import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent {
  constructor(private appService: AppService){}

  lists: any;
  emptyList: boolean | undefined;
  highClass = "background-color: red"
  lowClass = "background-color: yellow"
  countOfCompletedTask: number = 0;

  ngOnInit(): void {
    this.appService.getAllTaskFn().subscribe((data: any) => {

      if(data?.response?.length > 0){
        this.emptyList = false
        this.lists = data?.response
      }else{
        this.emptyList = true
      }
      // this.lists = []
    })
  }

}
