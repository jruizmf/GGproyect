import { Component } from '@angular/core';
import { ProductTablesComponent } from '../ui-components/product-tables/product-tables.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from 'src/app/components/modals/product-modal/product-modal.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductTablesComponent, MatIcon],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  loading:boolean = true;
  constructor(public dialog: MatDialog) {
    this.loading = true
  }
  openDialog() {
  
    const dialogRef = this.dialog.open(ProductModalComponent, {
      height: "calc(100% - 30px)",
      width: "calc(100% - 30px)",
      maxWidth: "80%",
      maxHeight: "800%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
