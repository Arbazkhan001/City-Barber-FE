import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  PasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
  constructor(private http: HttpClient, private loginservices: LoginService, private formBuilder: FormBuilder,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.emailRegex)
      ]],
      Password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern(this.PasswordRegex)
      ]]
    });
  }

  ngOnInit() {}

  getControl(name: string): AbstractControl | null {
    return this.loginForm.get(name);
  }

  onLogin(data: object) {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginForm.reset();
      this.router.navigate(['/dashboard']);
      this.loginservices.login(data).subscribe((result: any) => {
        console.log(result);
      });

    } else {
      this.markFormControlsAsTouched(this.loginForm);
      console.log("Form is invalid. Please check the form fields.");
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
