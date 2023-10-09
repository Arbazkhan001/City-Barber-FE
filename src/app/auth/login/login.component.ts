import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private http: HttpClient, private loginservices: LoginService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern(this.passwordRegex)
      ]]
    });
  }

  ngOnInit() { }

  getControl(name: string): AbstractControl | null {
    return this.loginForm.get(name);
  }

  onLogin(data: any) {
      this.loginservices.login(data).subscribe(
        (response) => {
          console.log('Authentication result:', response);
          this.router.navigate(['/auth/dashboard']);



          
        }
       
      );
    }
  }

  // markFormControlsAsTouched(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach((key) => {
  //     const control = formGroup.controls[key];
  //     if (control instanceof FormGroup) {
  //       this.markFormControlsAsTouched(control);
  //     } else {
  //       control.markAsTouched();
  //     }
  //   });
  // }
