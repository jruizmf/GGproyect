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
import { ProductService } from 'src/app/services/product.service';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {
  sizes: any[] = []
  constructor(private router: Router, private _productService: ProductService ) {}

  form = new FormGroup({
    product_name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    product_code: new FormControl('', [Validators.required]),
    size_id: new FormControl("8d7ddabe-fb8d-4423-b5cf-0824b22224e4", [Validators.required, Validators.minLength(6)]),
    colors_id: new FormControl(["01b62d59-15af-49dc-8373-9c62607c150f", "021d52b7-dde2-4124-a994-183a86790895" ,"dabfab44-bfef-43a4-9c7b-54223213c4ea", "f0c9bd79-2c6e-4cff-ac79-320713555804"], [Validators.required]),
  //  area_id: new FormControl('', [Validators.required]),
    is_available: new FormControl(true, [Validators.required, Validators.minLength(6)])
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }
}
