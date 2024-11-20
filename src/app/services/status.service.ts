import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  endpoint: string = env.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options: any = { headers: this.headers };
  constructor(private http: HttpClient) {
  }
  GetData() {
    return this.http.get<any[]>(this.endpoint + "/api/v1/states", this.options);
  }
}
