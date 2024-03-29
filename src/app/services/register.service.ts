import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  userRegister(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/users/register', data);
  }
}

// 3.110.193.224

