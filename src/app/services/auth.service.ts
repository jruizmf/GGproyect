import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import AuthDtoModel from '../models/Dto/authDto.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = env.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router, private _userService: UserService) {}
  // Sign-in
  signIn(auth: AuthDtoModel) {
    console.log(auth)
    let options = { headers: this.headers };
    return this.http
      .post<any>(`${this.endpoint}/api/v1/tokens/authentication`, auth, options)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.authentication_token.token);
        
        // this.getUserProfile(res.data.id).subscribe((res) => {
        //   this.currentUser = res;
        this._userService.GetCurrentUser().subscribe({
          next: res2 => {
            localStorage.setItem('name', res2.user.first_name+' '+res2.user.last_name)
            if (res2.permissions.length > 0) {
              var isAdmin = false;
              res2.permissions.forEach((p: string) => {
                if (p == 'user:admin') {
                  isAdmin = true;
                } 
                if (isAdmin) {
                  localStorage.setItem('role', 'Admin');
                } else {
                  localStorage.setItem('role', 'Operator');
                }
                this.router.navigate(['/dashboard']);
              });
            }

          },
          error: e => {
            console.log(e)
            alert("Error in Login")
          },
        });
         

       // });
      }, (error: any) =>{ console.log('oops', error)}
      );
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/User/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg)
    return throwError(msg);
  }
}
