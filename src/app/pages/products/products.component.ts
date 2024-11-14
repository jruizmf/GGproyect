import { Component } from '@angular/core';
import { ProductTablesComponent } from '../ui-components/product-tables/product-tables.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductTablesComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
