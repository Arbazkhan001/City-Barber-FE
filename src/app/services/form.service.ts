import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http:HttpClient) { }

  formdata(data:any){
    return this.http.post('http://3.110.193.224:3000/saloon/register',data)
  }
}
