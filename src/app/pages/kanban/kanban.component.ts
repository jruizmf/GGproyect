import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import OrderDtoModel from 'src/app/models/orderDto.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [DragDropModule, NgFor, NgIf, MatCardModule, DatePipe,MatIconModule, MaterialModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanBoardComponent implements OnInit {
  @Input() editable: boolean = false;
  
  list: any[] = [];
  loading: boolean
  board: Board;
/*  = new Board('Test Board', [
    new Column('Waiting', [
      "Some random idea",
      "This is another random idea",
      "build an awesome application"
    ]),
    new Column('In Process', [
      "Lorem ipsum",
      "foo",
      "This was in the 'Research' column"
    ]),
    new Column('Shipping', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ])
    
  ])*/
    drop(event: CdkDragDrop<OrderDtoModel[]>) {
      console.log(event)
      console.log("------------")
      console.log(event.container)
      console.log(event.previousContainer)
      console.log("------------")
      if (event.previousContainer === event.container) {
        console.log("1")
        console.log(event)
        console.log(event.container)
        console.log(event.previousIndex)
        console.log(event.currentIndex)
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        console.log("2")
        console.log(event)
        console.log(event.container)
        console.log(event.previousIndex)
        console.log(event.currentIndex)
        console.log(event.previousContainer.data)
        if(event.container.id == "cdk-drop-list-1"){

        }
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
    constructor(public _orderService: OrderService){
      
    }
    ngOnInit(): void {
      this.loading = false;
      var list1: any[]= [];
      var list2: any[]= [];
      var list3: any[]= [];
      this._orderService.GetData().subscribe((data: any) => {
        this.list =  data.orders.map((body: any) => {
          if(body.state_name == "waiting"){
            list1.push(body);
          }
          if(body.state_name == "in_progress"){
            list2.push(body);
          }
          if(body.state_name == "shipping"){
            list3.push(body);
          }
          return body;
        }) 
        this.board = new Board('Test Board', [
          new Column('Waiting', list1),
          new Column('In Process', list2),
          new Column('Shipping', list3)
          
        ])
        console.log("---------")
        console.log(this.board)
       }
      
    );
      setTimeout(() => {  }, 2000);
       
      this.loading= true
    }


  


  private  getData() :  any {
   
   // this.list = this._orderService.GetData() as OrderDtoModel[];
     
  }

}



