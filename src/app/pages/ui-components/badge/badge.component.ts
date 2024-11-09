import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { AppTopEmployeesComponent } from 'src/app/components/top-employees/top-employees.component';
import { AppProductSalesComponent } from 'src/app/components/product-sales/product-sales.component';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatCardModule, AppTopEmployeesComponent,
    AppProductSalesComponent],
})
export class AppBadgeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
