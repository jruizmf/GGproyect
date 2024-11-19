import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private router: Router, private _orderService: OrderService, private _machinesService : MachineService) {}

  form = new FormGroup({
    machine: new FormControl(),
    // order_ships_by: new FormControl('', [Validators.required]),
    // order_arrives: new FormControl('', [Validators.required]),
    // amount: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // state_id: new FormControl('', [Validators.required]),
    // area_id: new FormControl('', [Validators.required]),
    // user_id: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // products_details: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this._machinesService.GetData().subscribe((data: any) => {
      console.log(data)
      this.machines =  data.machines.map((body: any) => body) 
        
     })
  }
  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this._orderService.TakeOrder({order_id:this.orderId, state_id:"c6c9134b-d870-4b47-ae31-a60a8c93cb49", machines_id:this.machines})
  }
}
