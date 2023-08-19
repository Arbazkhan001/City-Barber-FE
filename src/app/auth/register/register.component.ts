import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit  {



  integreRegex = /^\d+$/;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  Phoneregex=/^[789][0-9]{9}$/
  PasswordRegex=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/;
  CpasswordRegex=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/;



  
   
  registerForm = this.fb.group({
    name: new FormControl("", [Validators.required, Validators.maxLength(12),Validators.pattern(/^[A-Za-z]+$/),Validators.minLength(4)]),
    email: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(20),Validators.pattern(this.emailRegex)]),
    Phone: new FormControl("", [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(this.Phoneregex)]),

    password: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(6),Validators.pattern(this.PasswordRegex)]),

    confirmpassword: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(6),Validators.pattern(this.CpasswordRegex)]),
  })
  submitted!: boolean;


  getControl(name: string): AbstractControl | null {
    return this.registerForm.get(name);
}

  private apiUrl = 'http://127.0.0.1:8080/auth/register';
 
constructor(private http: HttpClient ,private fb: FormBuilder) {}

ngOnInit() {}


registerFn(){
  if (this.registerForm.valid) {
      
    console.log(this.registerForm.value);
    const requestBody = this.registerForm.value;
     const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      this.http.post(this.apiUrl, requestBody, { headers }).subscribe(
        (response) => {
          console.log('Response:', response);
        },
        (error) => {
          console.log('error:', error);
        }
      )
        }  else {
    console.log("Form is invalid. Please check the form fields.");
  }
}
onSubmitClicked() {
  if (this.registerForm.valid) {
    this.markFormControlsAsTouched(this.registerForm);
    this.registerFn();
    this.registerForm.reset();
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

