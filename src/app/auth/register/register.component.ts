import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;
  getUser: any = [];
  data: any

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phoneRegex = /^[789][0-9]{9}$/;
  passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  userRegister: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[A-Za-z\s]*$/)]],
    email: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(50), Validators.pattern(this.emailRegex)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.phoneRegex)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(this.passwordRegex)]],
    confirmpassword: ['', [Validators.required]],
  });

  ngOnInit(): void { }

  getControl(username: string) {
    return this.userRegister.get(username);
  }

  onSubmitClicked() {
    if (this.userRegister.valid) {
      this.registerService.registerData(this.data).subscribe((response) => {
        console.info("response", response)
      })
      const password = this.userRegister.get('password')?.value;
      const confirmPassword = this.userRegister.get('confirmpassword')?.value;
      if (password === confirmPassword) {
        console.log('Form is valid', this.userRegister.value);
        this.registerData(this.userRegister.value);
        this.userRegister.reset();
        this.router.navigate(['/auth/login']);
      }

      else {
        this.userRegister.get('confrimPassword')?.setErrors({ passwordMismatch: true });
        console.error('Passwords do not match. Please check your password and confirm password fields.');
      }
    }
    else {
      console.error('Form is invalid. Please check the form fields.');
    }
  }

  // onSubmit() {
  //   if (this.userRegister.valid) {
  //     this.registerService
  //       .registerData('users')
  //       .subscribe((response) => {
  //         console.info("response", response)
  //         this.getUser = response.result;
  //       });
  //   }
  // }

  registerData(data: any): void {
    this.registerService.registerData(data).subscribe(
      (response) => {
        console.log('Response', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];
      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      } else {
        control.markAsTouched();
        console.log(`Control: ${key}, Valid: ${control.valid}`);
      }
    });
  }
}