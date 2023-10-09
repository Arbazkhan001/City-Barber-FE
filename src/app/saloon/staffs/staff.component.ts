import { Component } from '@angular/core';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffFormComponent {
    saloonID: string = ''; // Initialize with a default value
  name: string = '';
  expertise: string = '';
 

  onSubmit() {
    // You can access the form values here and perform your logic
    console.log('Saloon ID:', this.saloonID);
    console.log('Name:', this.name);
    console.log('Expertise:', this.expertise);

    // Perform staff registration logic here with the provided data
  }
}
