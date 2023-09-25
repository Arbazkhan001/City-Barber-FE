import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forgotPasswordService } from 'src/app/services/forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPassword: FormGroup;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private forgotpasswordservice: forgotPasswordService) {
    this.forgotPassword = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]]
    });
  }

  ngOnInit() { }

  getControl(name: string) {
    return this.forgotPassword.get(name);
  }

  isInvalid(name: string) {
    const control = this.getControl(name);
    return control?.invalid && control?.touched;
  }

  onSubmit() {
    if (this.forgotPassword.valid) {
      this.forgotpasswordservice.forgotPassword(this.forgotPassword.value).subscribe((response) => {
        console.log("response", response)
      })
      console.log(this.forgotPassword.value);
      this.forgotPassword.reset();
    } else {
      this.markFormControlsAsTouched(this.forgotPassword);
      console.log("Form is invalid. Please check the form fields.");
    }
  }

  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
