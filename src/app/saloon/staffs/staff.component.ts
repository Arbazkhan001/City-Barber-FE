import { Component } from '@angular/core';
import { StaffFormService } from '../services/staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})


export class StaffFormComponent {

  constructor(private staffFornService: StaffFormService,private router: Router){}
    saloonID: string = ''; // Initialize with a default value
  name: string = '';
  expertise: string = '';
 

  onSubmit(data :any) {
    // You can access the form values here and perform your logic
 this.staffFornService.addStaff(data).subscribe((response: any)=>{
  console.info("response",response)
  this.router.navigate(['saloon/staff'])
 })

    // Perform staff registration logic here with the provided data
  }
}
