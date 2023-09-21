import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class saloonRegisterService {

  constructor(private http:HttpClient) { }

  registerData(data:any){
    return this.http.post('http://localhost:3000/saloon/register',data)
  }
}
