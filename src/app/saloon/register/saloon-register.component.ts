import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { saloonRegisterService } from '../services/saloon-register.service';

@Component({
  selector: 'app-form',
  templateUrl: './saloon-register.component.html',
  styleUrls: ['./saloon-register.component.scss']
})
export class SaloonRegisterComponent implements OnInit {

  constructor(private SaloonregisterService: saloonRegisterService, private formBuilder: FormBuilder, private router: Router) { }

  data: any = [];
  allStates: any = [];
  allCities: any[] = [];
  filteredCities: any[] = [];
  selectedState: string = '';
  selectedCity: string = '';
  stateId:any =[];

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
    documents: ['', [Validators.required]]
  });
  

  ngOnInit(): void {
    this.getAllCities();
    this.getAllStates();
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

  onStateChange() {
    // Update the list of filteredCities based on the selected state
    const selectedState = this.registerForm.get('state')?.value;

    if (selectedState) {
      this.filteredCities = this.allCities.filter(city => city.state === selectedState);
    } else {
      this.filteredCities = [];
    }

    // Clear the selected city if it's not in the filtered list
    const selectedCity = this.registerForm.get('city')?.value;
    if (!this.filteredCities.includes(selectedCity)) {
      this.registerForm.get('city')?.setValue('');
    }
  }

  // onSubmit(data: any) {
  //   console.log('Form is valid', this.registerForm.value);
  //   if (this.registerForm.valid) {
  //     this.SaloonregisterService.saloonRegister(data).subscribe((response) => {
  //       console.log("response", response);
  //       this.getAllStates();
  //       this.getAllCities();
        
  //     })
  //     // this.registerData(this.registerForm.value);
  //   } else {
      
  //     console.error('Form is invalid. Please check the form fields.', this.registerForm.errors);
  //   }
  // }
  onSubmit(data: any) {
    // console.log('Form is valid', this.registerForm.value);
    if (this.registerForm.valid) {
      // const selectedState = this.registerForm.get('state')?.value;
      // const selectedCity = this.registerForm.get('city')?.value;
      // data.state = selectedState;
      // data.city = selectedCity;
      this.SaloonregisterService.saloonRegister(data).subscribe((response) => {
        console.info("response", response);
      });
    } else {
      console.error('Form is invalid. Please check the form fields.', this.registerForm.errors);
    }
  }

  getAllStates() {
    this.SaloonregisterService.getAllStates(this.data).subscribe(
      (response) => {
        this.allStates = response.data;
        console.info("response of state ", this.allStates);
        console.info("response of state ", this.allStates[0]);
      },
      (error) => {
        console.error("Error fetching states:", error);
      }
    );
  }
  
  getAllCities() {
    this.SaloonregisterService.getAllCities(this.data).subscribe(
      (response) => {
        this.allCities = response.data;
        console.info('city:', this.allCities[0]);
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }
  


  // getAllCities() {
  //   this.SaloonregisterService.getAllCities(this.data).subscribe(
  //     (response) => {
  //       // Check the response data
  //       console.log('API Response:', response);
  
  //       // Ensure that 'data' property exists in the response and assign it to 'allCities'
  //       if (response && response.data) {
  //         this.allCities = response.data;
  //         console.info('City:', this.allCities);
  //       } else {
  //         console.error('Invalid API response:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching cities:', error);
  //     }
  //   );
  // }
  
  // getAllCities() {
  //   this.SaloonregisterService.getAllCities(this.data).subscribe(
  //     (response) => {
  //       if (response && response.data && response.data.length > 0) {
  //         this.allCities = response.data;
  //         console.info('City:', this.allCities.values);
  
  //         // Assuming you have a default city and state selected from the response
  //         this.registerForm.patchValue({
  //           state: response.data[0].state, // Use the appropriate index or logic to select the default state
  //           city: response.data[0].city, // Use the appropriate index or logic to select the default city
  //         });
  //       } else {
  //         console.error('Invalid API response:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching cities:', error);
  //     }
  //   );
  // }

}
