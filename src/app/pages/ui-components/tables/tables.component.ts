import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import OrderDtoModel from 'src/app/models/orderDto.model';
import { OrderService } from 'src/app/services/order.service';
import { KanbanBoardComponent } from '../../kanban/kanban.component';

// table 1
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
    budget: 180,
    priority: 'confirmed',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    budget: 90,
    priority: 'cancelled',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'PlayStation 5 DualSense Wireless Controller',
    budget: 120,
    priority: 'rejected',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
    budget: 160,
    priority: 'confirmed',
  },
];

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    KanbanBoardComponent
  ],
  templateUrl: './tables.component.html',
})
export class AppTablesComponent {
  @Input() items: OrderDtoModel[] = [];
  @Input() headers: string[] = [];
  // table 1
   displayedColumns: string[] = [];
   dataSource:any[]  = [];
   displayTable:boolean = true;
   constructor(public _orderService: OrderService){

   }
   ngOnInit(): void {
     this._orderService.GetData().subscribe((data: any) => {
      this.dataSource=  data.orders.map((body: any) => body) 
      console.log(this.dataSource)
      })
    this.displayedColumns =  this.headers;
    
  }
}
