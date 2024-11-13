import { Component } from '@angular/core';
import { AppTablesComponent } from '../ui-components/tables/tables.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AppTablesComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
