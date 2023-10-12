//service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesFormService {

  constructor(private http: HttpClient) { }

  addService(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/services/create', data);
  }

//   getSaloonId(): Observable<any> {
//     return this.http.get('http://localhost:3000/saloon/userById:userId');
// }
}