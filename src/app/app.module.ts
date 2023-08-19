import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthModule } from './auth/auth.module'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}





// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AuthModule } from './auth/auth.module'; 
// import { AppComponent } from './app.component';
// import { AppHeaderComponent } from './common/header/header.component';
// import { AppFooterComponent } from './common/footer/footer.component';
// import { AppRoutingModule } from './app-routing.module';
// import { ReactiveFormsModule } from '@angular/forms';

// @NgModule({
//   declarations: [AppComponent, AppHeaderComponent, AppFooterComponent],
//   imports: [BrowserModule, ReactiveFormsModule, AuthModule, AppRoutingModule],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
