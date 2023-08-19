import { Component,OnInit  } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent  implements OnInit{

  registerForm: FormGroup = new FormGroup({}); 
  showConfirmPassword: boolean = false;
  showPassword: boolean = false;
  passwordMatch!: boolean;
  password!: boolean;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }



  
   togglePassword() {
    this.showPassword = !this.showPassword;
   }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  validatePasswords() {
  
    this.passwordMatch = this.password === this.showConfirmPassword;
  }
  getControl(name: string): AbstractControl | null {
    return this.registerForm.get(name);
}
onSubmitClicked() {
console.log(this.registerForm)
}
  
}


