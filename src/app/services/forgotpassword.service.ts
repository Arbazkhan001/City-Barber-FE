// forgot-password.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {
  constructor(private http: HttpClient) {}

  requestPasswordReset(email: string) {
    
    return this.http.post('http://localhost:3000/forgot-password', { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post('http://localhost:3000/reset-password', { token, newPassword });
  }
}
