import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class SaloonRegisterComponent implements OnInit {

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder, private router: Router) { }

  registerForm: FormGroup = this.formBuilder.group({
    saloonName: ['', [Validators.required, Validators.pattern(/^[A-Za-z_ ]+$/)]],
    ownerName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^[6789][0-9]{9}$/)]],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    address: ['', [Validators.required]],
    pincode: ['', [Validators.required, Validators.maxLength(6), Validators.pattern(/^[0-9]{6}$/)]],
    registrationNumber: ['', [Validators.required]],
    GSTNumber: ['', [Validators.required]],
    documents: ['', [Validators.required, this.validateFileExtension]]
  });

  ngOnInit(): void {
    // Initialization logic (if needed)
  }

  getControl(GSTNumber: string): AbstractControl | null {
    return this.registerForm.get(GSTNumber);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const validationError = this.validateFileExtension(file);
  
    if (validationError) {
      const allowedExtensions = ['jpeg', 'png', 'jpg'];
      const allowedTypes = allowedExtensions.join(', ').toUpperCase();
      const errorMessage = `Invalid file type. Allowed types: ${allowedTypes}`;
      console.error(errorMessage);
  
    } else {
      console.log('File is valid:', file);
        }
  }
  validateFileExtension(file: File | null): boolean {
    if (file) {
      const allowedExtensions = ['jpeg', 'png', 'jpg'];
      const fileExtension = (file.name || '').split('.').pop()?.toLowerCase() || '';
      return allowedExtensions.includes(fileExtension);
    }
    return false; // Validation failed
  }
  

  onSubmitClicked() {
    console.log('Form:', this.registerForm.value);
    console.log('Form Valid:', this.registerForm.valid);
    console.log('Validation Errors:', this.registerForm.errors);
    console.log('Form Control Statuses:', this.registerForm.controls);
    if (this.registerForm.valid) {
      console.log('Form is valid', this.registerForm.value);
      this.registerData(this.registerForm.value);
    } else {
      console.error('Form is invalid. Please check the form fields.', this.registerForm.errors);
    }
  }

  registerData(data: any): void {
    console.log('Request Data:', data); // Log the request data
    this.registerService.registerData(data).subscribe(
      (response) => {
        console.log('Response', response); // Log the API response
        // Redirect to saloon dashboard route after successful registration
        this.router.navigate(['/saloon/saloonDashboard']);
      },
      (error) => {
        console.error('Error:', error); // Log any errors
      }
    );
  }
}  
