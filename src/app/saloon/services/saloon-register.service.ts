import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


// const API_URL = 'http://3.110.193.224';
@Injectable({
  providedIn: 'root'
})
export class saloonRegisterService {
  public apiUrl = 'http://localhost:3000/state/getAll';

  constructor(private http: HttpClient) { }

  // saloonRegister(url: any) {
  //   return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  // }

  saloonRegister(data: any): Observable<any> {
    return this.http.post('http://3.110.193.224:3000/saloon/register', data);
  }
  getAllStates(data: any) {
    return this.http.get('http://3.110.193.224:3000/state/getAll', data);
  }

  // getAllCities(data: any) {
  //   return this.http.get('http://3.110.193.224:3000/city/getAll', data);
  // }
  getAllCities() {
    const apiUrl = 'http://3.110.193.224:3000/city/getAll';
    return this.http.get(apiUrl);
  }
  //  getAllStates(url: string): Observable<any> {
  //   return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  // }

}
