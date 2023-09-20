import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient){ }
  login(data:any) : Observable<any>{
  return this.http.post('http://localhost:3000/auth/login',data)
  }
}

//3.110.193.224