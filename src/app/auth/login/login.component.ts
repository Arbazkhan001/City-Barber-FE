import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  PasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private http: HttpClient, private loginservices: LoginService, private formBuilder: FormBuilder, private router: Router) {
    this.userLoginForm = this.formBuilder.group({
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

  ngOnInit() { }

  getControl(name: string): AbstractControl | null {
    return this.userLoginForm.get(name);
  }

  // onLogin(data: object) {
  //   if (this.userLoginForm.valid) {
  //     this.userLoginForm.reset();
  //     console.log("userLoginForm", this.userLoginForm)
  //     this.loginservices.login(data).subscribe((result: any) => {
  //       console.log("result", result);
  //     });
  //     this.router.navigate(['/dashboard']);
  //   } else {
  //     this.markFormControlsAsTouched(this.userLoginForm);
  //     console.log("Form is invalid. Please check the form fields.");
  //   }
  // }
  onLogin(data: object) {
    //   console.log('Form validity:', this.register.valid);
    // console.log('Name control validity:', this.register.get('name')?.valid);
    // console.log('Email control validity:', this.register.get('email')?.valid);
    if (this.userLoginForm.valid) {
      const password = this.userLoginForm.get('password')?.value;
      const email = this.userLoginForm.get('email')?.value;

      if (password === email) {
        console.log('Form is valid', this.userLoginForm.value);
        // this.registerData(this.userLoginForm.value);
        this.userLoginForm.reset();
        this.router.navigate(['/dashboard']);
      }
      else {
        this.userLoginForm.get('confrimPassword')?.setErrors({ passwordMismatch: true });
        console.error('Passwords do not match. Please check your password and confirm password fields.');
      }
    }
    else {
      console.error('Form is invalid. Please check the form fields.');
    }
  }

  // onSubmit(data: object) {
  //   if (this.userLoginForm.valid) {
  //     this.loginservices.userLogin('users/login').subscribe(
  //       (response) => {
  //         console.info(response)
  //       }
  //     )

  //   }

  // }

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
