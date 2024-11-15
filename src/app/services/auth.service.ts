import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import AuthDtoModel from '../models/Dto/authDto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = env.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-in
  signIn(auth: AuthDtoModel) {
    console.log(auth)
    return this.http
      .post<any>(`${this.endpoint}/api/v1/tokens/authentication`, auth)
      .subscribe((res: any) => {
        console.log(res)
        localStorage.setItem('access_token', res.authentication_token.token);
        // this.getUserProfile(res.data.id).subscribe((res) => {
        //   this.currentUser = res;
        //   //this.router.navigate(['/dashboard']);
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
    if (removeToken == null) {
      this.router.navigate(['/login']);
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
