import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

endpoint: string = env.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options: any = { headers: this.headers };
  constructor(public http: HttpClient) { }

  GetData() {
    return this.http.get<any[]>(this.endpoint + "/api/v1/users", this.options);
  }

  GetCurrentUser() {
    return this.http.get<any[]>(this.endpoint + "/api/v1/get-user", this.options);
  }

  create(data:any): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    let body = JSON.stringify(data);
    return this.http.post<any>(this.endpoint, body, {'headers':headers}).pipe(catchError(this.handleError));
  }
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
