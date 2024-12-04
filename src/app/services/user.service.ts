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
    return this.http.get<any[]>(this.endpoint + "/api/v1/users");
  }

  GetCurrentUser() {
    return this.http.get<any>(this.endpoint + "/api/v1/get-user");
  }

  create(data:any): Observable<any>{
    let body = JSON.stringify(data);
    return this.http.post<any>(this.endpoint+"/api/v1/admin/users", body);
  }
  UnableUser(body:any) {
    return this.http.patch<any>(this.endpoint + "/api/v1/admin/users", body);
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
