import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss'
})
export class OrderModalComponent {
  constructor(private router: Router) {}

  form = new FormGroup({
    order_name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    order_ships_by: new FormControl('', [Validators.required]),
    order_arrives: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.minLength(6)]),
    state_id: new FormControl('', [Validators.required]),
    area_id: new FormControl('', [Validators.required]),
    user_id: new FormControl('', [Validators.required, Validators.minLength(6)]),
    products_details: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }
}
