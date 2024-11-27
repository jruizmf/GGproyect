import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { OrderService } from 'src/app/services/order.service';
import { MachineService } from 'src/app/services/machine.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KanbanComponent } from '@syncfusion/ej2-angular-kanban';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-step-order-modal',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step-order-modal.component.html',
  styleUrl: './step-order-modal.component.scss'
})
export class StepOrderModalComponent implements OnInit{
  @Input() orderId: string = "";
  @Output() itemMoved = new EventEmitter<boolean>();
  machines: any[] = []
  constructor(private router: Router, private _orderService: OrderService,private _authService: AuthService, private _machinesService : MachineService,  public childDialogRef: MatDialogRef<StepOrderModalComponent>,
    public parentDialogRef : MatDialogRef<KanbanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<KanbanComponent>) {
      if(data){
        this.parentDialogRef = data
      }
    }

  form = new FormGroup({
    machine: new FormControl()
  });
  ngOnInit(): void {
    this._machinesService.GetData().subscribe((data: any) => {
      this.machines =  data.machines.map((body: any) => body) 
     })
  }
  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    Swal.fire({
      title: "Do you want to save the changes?",
      icon:"warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this._orderService.TakeOrder({order_id:this.orderId, state_id:"c6c9134b-d870-4b47-ae31-a60a8c93cb49", machines_id:this.form.value.machine}).subscribe({
          next: (data) => {
            
            this.childDialogRef.close();
            this.itemMoved.emit(true);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Order moved successfully!",
              showConfirmButton: false,
              timer: 4000
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
        
        // .subscribe((data: any) => {
        //   console.log(data)
        //   this.childDialogRef.close();
        //   this.itemMoved.emit(true);
        //   alert()
        //   Swal.fire({
        //     position: "center",
        //     icon: "success",
        //     title: "Order moved successfully!",
        //     showConfirmButton: false,
        //     timer: 4000
        //   });
        // })
       
      } else if (result.isDenied) {
        
        this.childDialogRef.close();
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: "Order moved successfully!",
        //   showConfirmButton: false,
        //   timer: 4000
        // });
        this.itemMoved.emit(false);
        this.childDialogRef.close();
      }
    });
    
  }
  closeBoth():void{
    this.childDialogRef.close();
    this.parentDialogRef.close();
  }
}
