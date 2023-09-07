 import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';
@Injectable({
   providedIn: 'root'
 })
 export class RegisterService {

  constructor(private http:HttpClient)  { }

   registerData(data:any): Observable<any> {
     return this.http.post('http://3.110.193.224:3000/users/register',data );
   }
 }

