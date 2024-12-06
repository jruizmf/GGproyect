import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  constructor(private router: Router, private _userService : UserService) {}

  form = new FormGroup({
    user_code: new FormControl('', [Validators.required, Validators.minLength(1)]),
    first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    
    var data = {

    }
    this._userService.create(this.form.value).subscribe((data: any) => {
         window.location.reload()
      })
  }
}
