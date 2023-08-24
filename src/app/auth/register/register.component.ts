import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  integreRegex = /^\d+$/;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  Phoneregex = /^[789][0-9]{9}$/;
  PasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/;
  CpasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/;

  registerForm = this.fb.group({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern(/^[A-Za-z]+$/),
      Validators.minLength(4),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(20),
      Validators.pattern(this.emailRegex),
    ]),
    Phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(this.Phoneregex),
    ]),

    Password: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(6),
      Validators.pattern(this.PasswordRegex),
    ]),

    ConfrimPassword: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(6),
      Validators.pattern(this.CpasswordRegex),
    ]),
  });
  submitted!: boolean;
  getControl(name: string): AbstractControl | null {
    return this.registerForm.get(name);
  }
  constructor(private http: HttpClient, private fb: FormBuilder, private renderer: Renderer2 ) {}
  ngOnInit(): void {}
  registerFn() {
    if (this.registerForm.valid) {
      
      console.log(this.registerForm.value);
        this.registerForm.reset(); 
    
    } else {
      console.log('Form is invalid. Please check the form fields.');
    }
  }
  onSubmitClicked() {
    this.markFormControlsAsTouched(this.registerForm);
  
    if (this.registerForm.valid) {
      const password = this.registerForm.get('Password')?.value;
      const confirmPassword = this.registerForm.get('ConfrimPassword')?.value;
  
      if (password === confirmPassword) {
        console.log(this.registerForm.value);
        this.registerForm.reset();
        console.log('Passwords match. Submitting the form.');
      } else {
       
        this.registerForm.get('ConfrimPassword')?.setErrors({ passwordMismatch: true });
        console.log('Passwords do not match. Please check your password and confirm password fields.');
      }
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

