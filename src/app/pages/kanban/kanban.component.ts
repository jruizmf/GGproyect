import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import OrderDtoModel from 'src/app/models/orderShippingDto.model';
import { OrderService } from 'src/app/services/order.service';
import { KanbanModalComponent } from 'src/app/components/modals/kanban-modal/kanban-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { StepOrderModalComponent } from 'src/app/components/modals/step-order-modal/step-order-modal.component';

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

    drop(event: CdkDragDrop<OrderDtoModel[]>, order:any[]) {
    
      if (event.previousContainer === event.container) {
        console.log("1")
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        console.log("2")
        console.log(event.previousContainer.data)
        console.log(event.container)
        if(event.container.id == "cdk-drop-list-1"){
          console.log(event)
          
          
          this.openDialog(order[event.currentIndex].id)
        } else if(event.container.id == "cdk-drop-list-2"){
          this._orderService.PutData({order_id: order[event.currentIndex].id, state_id :"f896d295-0b83-4e10-9f59-259e819b0731"})
         // this._orderService.PutData({order_id:"", state_id :"f896d295-0b83-4e10-9f59-259e819b0731"})
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }

        }
        
    }
    constructor(public _orderService: OrderService, private dialog: MatDialog){
      
    }
    ngOnInit(): void {
      this.loading = false;
      var list1: any[]= [];
      var list2: any[]= [];
      var list3: any[]= [];
      this._orderService.GetData().subscribe((data: any) => {
        this.list =  data.orders.map((body: any) => {
          console.log(body.state_name)
          if(body.state_name == "waiting"){
            list1.push(body);
          }
          if(body.state_name == "in progress"){
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

    openDialog(orderId:any) {
  
      const dialogRef = this.dialog.open(StepOrderModalComponent, {
         height: "calc(100% - 30px)",
         width: "calc(100% - 30px)",
        maxWidth: "90%",
        maxHeight: "100%"
      });
      let instance = dialogRef.componentInstance;
      instance.orderId = orderId;
      
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  


  private  getData() :  any {
   
   // this.list = this._orderService.GetData() as OrderDtoModel[];
     
  }

}



