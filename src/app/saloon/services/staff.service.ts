import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class StaffFormService {

    constructor(private http: HttpClient) { }

    addStaff(data: any): Observable<any> {
        return this.http.post('http://localhost:3000/staffs/create', data)
    }
}