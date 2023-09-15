import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from '../common/home/header/header.component';

import { FooterComponent } from '../common/home/footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { FormComponent } from '../constant/form/form.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


const routes: Routes = [{ path: '', component: HomeComponent }, { path: 'auth/login', component: LoginComponent }, { path: 'auth/register', component: RegisterComponent },{path:'dashboard',component:DashboardComponent},{path:'header',component:HeaderComponent},{path:'footer',component:FooterComponent},{path:'home',component:HomeComponent},{path:'saloon/register',component:FormComponent},{path:'forgot-password',component:ForgotpasswordComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
