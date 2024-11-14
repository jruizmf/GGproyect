import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import OrderDtoModel from '../models/orderDto.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  endpoint: string = env.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json')//.set('Authorization', `Bearer ${localStorage.getItem('access_token') || ''}`);
  constructor(private http: HttpClient, private _authService: AuthService) {
  }
  GetData(): Observable<any> {
    
    console.log(localStorage.getItem('access_token'))
    const params = new HttpParams()
      .set("state_name", 'waiting')
      .set("page_size", 3)
      .set("page", 1);

    return  this.http.get(this.endpoint + "/api/v1/orders", {headers: this.headers, params});
  }

}
