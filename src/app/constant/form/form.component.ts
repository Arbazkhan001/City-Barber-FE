import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent  implements OnInit{

  getControl(name: string): AbstractControl | null {
    return this.registerForm.get(name);
}


 
validateImageType(control: AbstractControl): ValidationErrors | null {
  const file: File = control.value;

  if (file) {
    const allowedExtensions = ['jpeg', 'png', 'jpg'];
    const fileExtension = (file.name || '').split('.').pop()?.toLowerCase() || '';

    if (allowedExtensions.includes(fileExtension)) {
      return { invalidFileType: true };
    }
  }

  return null;
}

constructor(private formservices:FormService,private  formBuilder:FormBuilder,private router:Router){}
registerForm= new FormGroup({
  saloonName:new FormControl( '', [
    Validators.required,
    Validators.pattern(/^[A-Za-z_ ]+$/), 
  ]),
  ownerName:new FormControl('',[
 Validators.required,
 Validators.pattern(/^[A-Za-z ]+$/),
  ]),
  email:new FormControl('',[
    Validators.required,
    Validators.pattern( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ]),
  phone:new FormControl('',[
    Validators.required,
    Validators.pattern(/^[6789][0-9]{9}$/),
  ]),
  state:new FormControl('',[
    Validators.required,
    
  ]),
  city:new FormControl('',[
Validators.required,

  ]),
  address:new FormControl('',[
 Validators.required,
  ]),
  pincode:new FormControl('',[
  Validators.required,
  Validators.maxLength(6),
   Validators.pattern(/^[0-9]{6}$/),
  ]),
  registrationNumber:new FormControl('',[
  Validators.required,
  
  ]),
  GSTNNumber: new FormControl('', [
    Validators.required,
    
  ]),
   documents: new FormControl('', [
     Validators.required,
     this.validateImageType,
   ]),
})

ngOnInit(): void {

}
 
registerFn() {
  if (this.registerForm.valid) { 
    console.log('Form is valid.', this.registerForm.value);
    this.formdata(this.registerForm.value)
    this.registerForm.reset();
   

}else {
  console.log('Form is invalid. Please check the form fields.');
}
}

onSubmitClicked() {
  this.markAllFieldsAsTouched(this.registerForm);   
 }
  
  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      }
    });
  }
  formdata(data: any): void {
    this.formservices.formdata(data).subscribe(
      (response) => {
        console.log("Form submission successful.", response);
        this.router.navigate(['dashboard/dashboardsaloon']);
        console.log("Navigation executed.");
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
  
}