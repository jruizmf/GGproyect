import { Component, OnInit } from '@angular/core';
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
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
    constructor(public _orderService: OrderService){
      
    }
    ngOnInit(): void {
      // this._authService.signIn({
      //   email: 'rossette@gmail.com',
      //   password: 'CrzxTikim723.es$'
      // });
      this.loading = false;
      var list = [];
      var list2 = [];
      this._orderService.GetData().subscribe((data: any) => {
        this.list =  data.orders.map((body: any) => body) 
        this.board= new Board('Test Board', [
          new Column('Waiting', this.list),
          new Column('In Process', []),
          new Column('Shipping', [])
          
        ])
       }
    );
      setTimeout(() => {  }, 1000);
       
      console.log(this.board)
      this.loading= true
    }


  


  private  getData() :  any {
   
   // this.list = this._orderService.GetData() as OrderDtoModel[];
     
  }

}



