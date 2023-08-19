import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import {FormsModule} from '@angular/forms';




@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    CreatePasswordComponent,
 
   
   ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }




