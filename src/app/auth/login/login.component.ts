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

  onLogin(data: object) {
    // console.log('Form validity:', this.loginForm.valid);
    // console.log('Control validity:', this.loginForm.get('password')?.valid);
    // console.log('Email control validity:', this.loginForm.get('email')?.valid);

    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      console.log('Credentials:', credentials);

      this.loginservices.login('credentials').subscribe(
        (response: any) => {
          console.log('Authentication result:', response);

          if (this.loginForm.valid) {
            console.log('User is authenticated. Navigating to dashboard...');
            this.router.navigate(['/dashboard']);
          } else {
            console.error('User not found or invalid credentials');
          }
        },
        (error) => {
          console.error('Error during authentication:', error);
        }
      );
    } else {
      this.markFormControlsAsTouched(this.loginForm);
      console.log('Form is invalid. Please check the form fields.');
    }
  }

  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];
      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
