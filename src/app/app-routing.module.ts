import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent} from "./dashboard/dashboard.component"
import{SaloonDashboardComponent} from "./saloon/dashboard/saloon-dashboard.component"
import { StaffFormComponent } from './saloon/staffs/staff.component';
import { ServicesFormComponent } from './saloon/saloonService/service.component';

const routes: Routes = [{ path: 'users/dashboard', component: DashboardComponent },{ path: 'saloon/services', component: ServicesFormComponent },  { path: 'dashboard/dashboardsaloon', component: SaloonDashboardComponent},{path:'saloon/staff', component: StaffFormComponent},
{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
