import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgoDashboardComponent } from './ngo-dashboard/ngo-dashboard.component';
import { AuthService } from './services/auth.service';
import { AuthTokenInterceptor } from './services/authintercepter.service';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    NgoDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }), 
  ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
