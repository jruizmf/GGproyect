import { Component, Inject, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-step-order-modal',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step-order-modal.component.html',
  styleUrl: './step-order-modal.component.scss'
})
export class StepOrderModalComponent implements OnInit{
  @Input() orderId: string = "";
  machines: any[] = []
  constructor(private router: Router, private _orderService: OrderService, private _machinesService : MachineService,  public childDialogRef: MatDialogRef<StepOrderModalComponent>,
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
      /* Read more about isConfirmed, isDenied below */
      console.log(this.form.value.machine)
      if (result.isConfirmed) {
        console.log(this.orderId)
        this._orderService.TakeOrder({order_id:this.orderId, state_id:"c6c9134b-d870-4b47-ae31-a60a8c93cb49", machines_id:this.form.value.machine}).subscribe((data: any) => {
          console.log(data)
          this.childDialogRef.close();
          Swal.fire("Saved!", "", "success");
        })
       
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        this.childDialogRef.close();
      }
    });
    
  }
  closeBoth():void{
    this.childDialogRef.close();
    this.parentDialogRef.close();
  }
}
