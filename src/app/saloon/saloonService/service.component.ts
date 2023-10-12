import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffFormService } from '../services/staff.service';
import { ServicesFormService } from '../services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServicesFormComponent implements OnInit {
  data: {
    duration: string;
    name: string;
    price: string;
    saloonId:string;
  } = {
    name: '',
    price: '',
    duration: '',
    saloonId:'',
  };

  constructor(private servicesFormService: ServicesFormService, private router: Router) { }

  ngOnInit(): void {
    // this.fetchSaloonId();
  }
  // fetchSaloonId() {
  //   // Make an HTTP request to your backend to get the saloonId
  //   this.servicesFormService.getSaloonId().subscribe((response: any) => {
  //     console.info("SaloonId Response:", response);
  //     // Assuming the response contains the 'saloonId' field
  //     this.data.saloonId = response.saloonId;
  //   });
  // }


  addServices(data: any) {
    this.servicesFormService.addService(data).subscribe(
      (response: any) => {
        console.info("Response:", response);
      },
      (error: any) => {
        console.error("Error:", error);
      }
    );
  }
  
  }