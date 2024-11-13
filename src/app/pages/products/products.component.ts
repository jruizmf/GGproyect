import { Component } from '@angular/core';
import { AppTablesComponent } from '../ui-components/tables/tables.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AppTablesComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
