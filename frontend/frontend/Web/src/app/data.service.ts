// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(endpoint: string): Observable<any> {
    const url = `http://localhost:5017/api/simulador/${endpoint}`;
    return this.http.get<any>(url);
  }
}
