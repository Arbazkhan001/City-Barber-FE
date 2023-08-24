import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormGroup,FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent  implements OnInit{
 
  getControl(name: string): AbstractControl | null {
    return this.registerForm.get(name);
}

validateImageType(control: FormControl): { [key: string]: any } | null {
  const file = control.value;
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return { invalidFileType: true };
    }
  }
  return null;
}

registerForm= new FormGroup({
  name:new FormControl( '', [
    Validators.required,
    Validators.pattern(/^[A-Za-z]+$/),
  ]),
  ownerName:new FormControl('',[
 Validators.required,
 Validators.pattern(/^[A-Za-z]+$/),
  ]),
  email:new FormControl('',[
    Validators.required,
    Validators.pattern( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ]),
  Phone:new FormControl('',[
    Validators.required,
    Validators.pattern(/^[789][0-9]{9}$/),
  ]),
  state:new FormControl('',[
    Validators.required,
    Validators.pattern(/^[A-Za-z]+$/),
  ]),
  city:new FormControl('',[
Validators.required,
Validators.pattern(/^[A-Za-z]+$/),
  ]),
  Address:new FormControl('',[
 Validators.required,
 Validators.pattern(/^[A-Za-z]+$/),
  ]),
  Pincode:new FormControl('',[
  Validators.required,
  // Validators.pattern(/^[0-9]{6}$/),
  ]),
  RegistrationNo:new FormControl('',[
  Validators.required,
  Validators.pattern(/^[0-9]{9}$/),
  ]),
  gstn:new FormControl('',[
Validators.required,
Validators.pattern(/^[0-9]{15}$/),
  ]),
  photo: new FormControl('', [
    Validators.required,
    this.validateImageType 
  ])
})

ngOnInit(): void {
    
}
registerFn(){
  if (this.registerForm.valid) {
      
    console.log(this.registerForm.value);
      this.registerForm.reset(); 
  
  } else {
    console.log('Form is invalid. Please check the form fields.');
  }
}



  onSubmitClicked() {
    if (this.registerForm.invalid) {
  
      this.markAllFieldsAsTouched(this.registerForm);
      return;
    }

    
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

  

}




