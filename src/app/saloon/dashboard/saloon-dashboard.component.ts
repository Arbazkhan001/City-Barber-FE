import { Component, OnInit } from '@angular/core';
import { SaloonDashboardService } from '../services/saloon-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './saloon-dashboard.component.html',
  styleUrls: ['./saloon-dashboard.component.scss']
})
export class SaloonDashboardComponent implements OnInit {
  data: {
    stateId: string;
    name: string;
    expertise: string;
  } = {
    stateId: '',
    name: '',
    expertise: ''
  };  constructor(private saloonDashboardService: SaloonDashboardService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addStaff(data: any) {
    this.router.navigate(['/saloon/staff']);
  }
}
