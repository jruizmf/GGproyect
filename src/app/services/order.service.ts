import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import OrderTakeDtoModel from '../models/orderTakeDto.model';
import OrderShippingDtoModel from '../models/orderShippingDto.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  endpoint: string = env.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options: any = { headers: this.headers };
  constructor(private http: HttpClient, private _authService: AuthService) {
  }
  GetData(): Observable<any> {
    const params = new HttpParams()
      .set("state_name", 'waiting')
      .set("page_size", 3)
      .set("page", 1);

    return  this.http.get(this.endpoint + "/api/v1/orders-table", {headers: this.headers, params});
  }
  PostData(body:any): Observable<any> {
    const params = new HttpParams()
      .set("state_name", 'waiting')
      .set("page_size", 3)
      .set("page", 1);

    return  this.http.post(this.endpoint + "/api/v1/orders-table", body, {headers: this.headers, params});
  }
  TakeOrder(body:any): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');

    return  this.http.post(this.endpoint + "/api/v1/orders/change-order-status", body, {headers: headers});
  }
  PutData(body:OrderShippingDtoModel): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');

    return  this.http.put(this.endpoint + "/api/v1/orders", body,{headers: headers});
  }
}
