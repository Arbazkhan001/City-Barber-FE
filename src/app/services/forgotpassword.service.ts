import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class forgotPasswordService {

    constructor(private http: HttpClient) { }

    forgotPassword(data: any): Observable<any> {
        return this.http.post('http://localhost:3000/forgot-password/forgot-password', data)
    }
}