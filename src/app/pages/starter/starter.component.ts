import { Component, forwardRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppProfitExpensesComponent } from 'src/app/components/profit-expenses/profit-expenses.component';
import { AppTrafficDistributionComponent } from 'src/app/components/traffic-distribution/traffic-distribution.component';
import { AppProductSalesComponent } from 'src/app/components/product-sales/product-sales.component';
import { AppUpcomingSchedulesComponent } from 'src/app/components/upcoming-schedules/upcoming-schedules.component';
import { AppTopEmployeesComponent } from 'src/app/components/top-employees/top-employees.component';
import { AppBlogComponent } from 'src/app/components/apps-blog/apps-blog.component';
import { KanbanComponent } from '@syncfusion/ej2-angular-kanban';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanBoardComponent } from '../kanban/kanban.component';
import { MatDialog } from '@angular/material/dialog';
import { KanbanModalComponent } from 'src/app/components/modals/kanban-modal/kanban-modal.component';
import 'reflect-metadata'
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppProfitExpensesComponent,
    AppTrafficDistributionComponent,
    AppProductSalesComponent,
    AppUpcomingSchedulesComponent,
    AppTopEmployeesComponent,
    AppBlogComponent,
    MatProgressSpinnerModule,
    DragDropModule,
    NgIf,
    forwardRef(() =>KanbanBoardComponent)
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent implements OnInit {
  loading:boolean = true;
  constructor(public dialog: MatDialog) {
    this.loading = true
    Swal.fire({
      position: "center",
      icon: "info",
      title: "loading!",
      showConfirmButton: false,
      timer: 3000
    });
    this.loading = false
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loading = false


    this.loading = true
  }

  openDialog() {
  
    const dialogRef = this.dialog.open(KanbanModalComponent, {
      height: "calc(100% - 30px)",
      width: "calc(100% - 30px)",
      maxWidth: "100%",
      maxHeight: "100%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 }