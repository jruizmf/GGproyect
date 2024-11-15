import { Component } from '@angular/core';
import { AppTopEmployeesComponent } from 'src/app/components/top-employees/top-employees.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AppTopEmployeesComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
