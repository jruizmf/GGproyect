import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/material.module';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddUserComponent } from '../modals/add-user/add-user.component';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  hrate: number;
  skills: string;
  priority: string;
  progress: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Mark J. Freeman',
    position: 'Developer',
    skills: 'HTML',
    hrate: 80,
    priority: 'Available',
    progress: 'success',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Nina R. Oldman',
    position: 'Designer',
    skills: 'JavaScript',
    hrate: 70,
    priority: 'On Holiday',
    progress: 'primary',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Arya H. Shah',
    position: 'Developer',
    skills: 'React',
    hrate: 40,
    priority: 'Absent',
    progress: 'error',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'June R. Smith',
    position: 'Designer',
    skills: 'Vuejs',
    hrate: 20,
    priority: 'On Leave',
    progress: 'warning',
  },
];

@Component({
  selector: 'app-top-employees',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MaterialModule],
  templateUrl: './top-employees.component.html',
})
export class AppTopEmployeesComponent {
  displayedColumns: string[] = [];
  dataSource:any[]  = [];
  constructor(public _userService: UserService, public _orderService: OrderService, private dialog: MatDialog){

  }
  ngOnInit(): void {
    this._userService.GetData().subscribe((data: any) => {
     console.log(data)
     this.dataSource=  data.users.map((body: any) => body) 
        
     })
   this.displayedColumns =  ['profile', 'email', 'status', 'actions']//this.headers;

  }
   public openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
    
      width: '500px',
      maxWidth: "100%",
      maxHeight: "100%"
    });
    let instance = dialogRef.componentInstance;

    dialogRef.afterClosed().subscribe(result => {
       window.location.reload();
    });
  }


public UnableUser(item:any) :  void {
  console.log(item.id)
  this._userService.UnableUser({user_id :item.id}).subscribe((data: any) => {
    console.log(data)
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User moved successfully!",
      showConfirmButton: false,
      timer: 6000
    });
    window.location.reload();
  })
}
}
