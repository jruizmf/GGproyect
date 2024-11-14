import { Component } from '@angular/core';
import { AppTablesComponent } from '../ui-components/tables/tables.component';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import OrderDtoModel from 'src/app/models/orderDto.model';
import { NgIf } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AppTablesComponent, NgIf],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  loading: boolean = false;
  list: any[]
  headers: string[] = ['orderNo', 'amount', 'arrived', 'shippedBy', 'status']
  constructor(public _orderService: OrderService, public _authService: AuthService){

  }
  ngOnInit(): void {
    // this._authService.signIn({
    //   email: 'rossette@gmail.com',
    //   password: 'CrzxTikim723.es$'
    // });
    this.loading= false
    this._orderService.GetData().subscribe((data: any) => {
      this.list =  data.orders.map((body: any) => body) 
        
     }
  );
    setTimeout(() => { }, 3003);
      
    this.loading= true
  }

  private getData(): void{
   
    this._orderService.GetData().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data: any) => {
      const orders =  data.orders
      this.list =   data.orders
      
    }
  );
  }

}
