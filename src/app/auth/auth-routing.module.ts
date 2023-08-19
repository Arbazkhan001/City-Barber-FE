import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [{ path: '', component: AuthComponent }, { path: 'login', component: LoginComponent }, { path: 'register', component: RegisterComponent }, { path: 'forgetpassword', component: ForgetpasswordComponent}, { path: 'CreatePassword', component: CreatePasswordComponent },{path: 'sidebar', component: SidebarComponent},{path: 'navbar', component: NavbarComponent},{  path: 'dashboard', component: DashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
