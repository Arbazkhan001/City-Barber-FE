import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent} from "./dashboard/dashboard.component"
import{SaloonDashboardComponent} from "./saloon/dashboard/saloon-dashboard.component"

const routes: Routes = [{ path: 'users/dashboard', component: DashboardComponent },  { path: 'dashboard/dashboardsaloon', component: SaloonDashboardComponent},
{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
