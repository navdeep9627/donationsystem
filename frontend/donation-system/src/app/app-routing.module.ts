import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgoDashboardComponent } from './ngo-dashboard/ngo-dashboard.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent
},
{
  path: 'user-dashboard',
  component: UserDashboardComponent
},
{
  path: 'ngo-dashboard',
  component: NgoDashboardComponent
},
{
  path: 'admin-dashboard',
  component: AdminDashboardComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
