import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SaloonDashboardService {

  constructor(private http: HttpClient) { }

  addStaff(data: any): Observable<any> {
    return this.http.get('http://localhost:3000/staffs/getAll', data);
  }
}

// 3.110.193.224

