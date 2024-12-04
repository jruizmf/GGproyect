import { Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import OrderDtoModel from 'src/app/models/orderShippingDto.model';
import { OrderService } from 'src/app/services/order.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StepOrderModalComponent } from 'src/app/components/modals/step-order-modal/step-order-modal.component';
import { StatusService } from 'src/app/services/status.service';
import Swal from 'sweetalert2';
import { KanbanComponent } from '@syncfusion/ej2-angular-kanban';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [DragDropModule, NgFor, NgIf, MatCardModule, DatePipe,MatIconModule, MaterialModule,CommonModule],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: { data: {} } }
],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanBoardComponent implements OnInit {
  @Input() editable: boolean = false;
  
  list: any[] = [];
  loading: boolean
  board: Board;

    drop(event: CdkDragDrop<OrderDtoModel[]>, order:any[]) {
      console.log(order)
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
       
          console.log(event.container.id)
          if(event.container.id == "cdk-drop-list-0"){
            transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
            this._orderService.TakeOrder({order_id: order[event.currentIndex].id, state_id :"f08868db-9106-44f5-a5b5-8a13164a5773"}).subscribe({
              next: (data) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Order moved successfully!",
                  showConfirmButton: false,
                  timer: 2000
                });
              },
              error: (e) => {
                console.log(e)
                console.log(e.error)
                console.log(e.error.response)
                console.log(e.error.response.status_code)
             
              
                if (e.error.response.status_code == 401) {
                  Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Session expired!",
                    text: 'You will be redirected to login.',
                    showConfirmButton: false,
                    timer: 4000
                  });
                  this._authService.doLogout()
                } else if (e.error.response.status_code == 404) {
                  let error = "";
                  error = e.error.response.errors.user;
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something was wrong!",
                    text: error,
                    showConfirmButton: false,
                    timer: 4000
                  });
                } else{
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something was wrong!" ,
                    text: e.toString(),
                    showConfirmButton: false,
                    timer: 4000
                  });
                }
                
                window.location.reload()
              },
              complete: () => console.log(),
            })
          }
        else if(event.container.id == "cdk-drop-list-1"){
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.openDialog(order[event.currentIndex].id)
         
        } else if(event.container.id == "cdk-drop-list-2"){
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          Swal.fire({
            title: "Do you want to save the changes?",
            icon:"warning",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              console.log(order)
             console.log(order[event.currentIndex].id)
              this._orderService.TakeOrder({order_id: order[event.currentIndex].id, state_id :"f896d295-0b83-4e10-9f59-259e819b0731"})
              .subscribe({
                next: (data) => {
                  
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Order moved successfully!",
                    showConfirmButton: false,
                    timer: 2000
                  });
                },
                error: (e) => {
                  if (e.error.response.status_code == 401) {
                    Swal.fire({
                      position: "center",
                      icon: "warning",
                      title: "Session expired!",
                      text: 'You will be redirected to login.',
                      showConfirmButton: false,
                      timer: 4000
                    });
                    this._authService.doLogout()
                  } else if (e.error.response.status_code == 404) {
                    let error = "";
                  
                    Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "Something was wrong!",
                      text: e.error.response.errors.user,
                      showConfirmButton: false,
                      timer: 4000
                    });
                  } else{
                    Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "Something was wrong!" ,
                      text: e.toString(),
                      showConfirmButton: false,
                      timer: 4000
                    });
                  }
                  window.location.reload()
                },
                complete: () => console.log(),
              })
              
             
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        }
      }
    }
    constructor(public _orderService: OrderService, public _authService: AuthService, public _statusService: StatusService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any,
    private parentDilogRef: MatDialogRef<KanbanComponent>){
      console.log(data)
    }
    ngOnInit(): void {
      this.loading = false;
      var list1: any[]= [];
      var list2: any[]= [];
      var list3: any[]= [];
       this._orderService.GetData().subscribe({
        next: (data) => {
          console.log(data.orders)
          this.list =  data.orders.map((body: any) => {
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
              
              var arrays: any[] = []
              this._statusService.GetData().subscribe((data2: any) => {
                arrays = data2.states.map((body: any) => { 
                  return body;
                })
              })
              console.log(arrays)
              this.board = new Board('Test Board', [
                new Column('', 'Waiting', list1),
                new Column('','In Process', list2),
                new Column('','Shipping', list3)
              ])
        },
        error: (e) => {
          if (e.error.response.status_code == 401) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Session expired!",
              text: 'You will be redirected to login.',
              showConfirmButton: false,
              timer: 4000
            });
            this._authService.doLogout()
          }
        },
        complete: () => console.log(),
      })
       
      this.loading= true
    }

    openDialog(orderId:any) {
      const dialogRef = this.dialog.open(StepOrderModalComponent, {
        height: '300px',
        width: '450px',
        maxWidth: "100%",
        maxHeight: "100%"
      });
      let instance = dialogRef.componentInstance;
      instance.orderId = orderId;
     
      console.log(orderId)
      
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
         window.location.reload();
      });
    }


  public finishOrder(item:any) :  void {
    this._orderService.TakeOrder({order_id: item.id, state_id :"6a374462-2eb9-4c64-b5aa-80509033176a"}).subscribe((data: any) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Order moved successfully!",
        showConfirmButton: false,
        timer: 4000
      });
      window.location.reload();
    })
  }

}



