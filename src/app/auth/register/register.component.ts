import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
 data :any ;
visible:boolean=true
changetype:boolean=true
viewpass(){
  this.visible=!this.visible
  this.changetype=!this.changetype
}


  integreRegex = /^\d+$/;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  Phoneregex = /^[789][0-9]{9}$/;
  PasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/;
  CpasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/;
  ngOnInit(): void {}
  register= this.fb.group({
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
 
  getControl(name: string): AbstractControl | null {
    return this.register.get(name);
  }
  constructor(private fb: FormBuilder,private registerService:RegisterService, private renderer: Renderer2 ) {}
 
 onSubmitClicked() {
     this.markFormControlsAsTouched(this.register);
  
    if (this.register.valid) {
      const password = this.register.get('Password')?.value;
      const confirmPassword = this.register.get('ConfrimPassword')?.value;
  
       if (password === confirmPassword) {
        console.log('form is valid',this.register.value) 
        this.registerData(this.register.value)
        this.register.reset()
        } else {
         this.register.get('ConfrimPassword')?.setErrors({ passwordMismatch: true });
         console.log('Passwords do not match. Please check your password and confirm password fields.');
           } 
      }else {
        console.error('Form is invalid. Please check the form fields.');
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

  registerData(data: any): void {
    this.registerService. registerData(data).subscribe(
      (response) => {
        console.log("response", response);
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
  
}

