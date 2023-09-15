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

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  // Define your regular expressions here
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phoneRegex = /^[789][0-9]{9}$/;
  passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  register: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[A-Za-z\s]*$/)]],
    email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern(this.emailRegex)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.phoneRegex)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(this.passwordRegex)]],
    confirmpassword: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  getControl(name: string) {
    return this.register.get(name);
  }

  onSubmitClicked() {
  //   console.log('Form validity:', this.register.valid);
  // console.log('Name control validity:', this.register.get('name')?.valid);
  // console.log('Email control validity:', this.register.get('email')?.valid);
    if (this.register.valid) {
      const password = this.register.get('Password')?.value;
      const confirmPassword = this.register.get('ConfrimPassword')?.value;

      if (password === confirmPassword) {
        console.log('Form is valid', this.register.value);
        this.registerData(this.register.value);
        this.register.reset();
        this.router.navigate(['/auth/login']);

        
      } 
      
      else {
        this.register.get('confrimPassword')?.setErrors({ passwordMismatch: true });
        console.error('Passwords do not match. Please check your password and confirm password fields.');
      }
    }
     else {
      console.error('Form is invalid. Please check the form fields.');
    }
  }

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