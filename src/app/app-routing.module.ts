import { AllComputersComponent } from './components/all-computers/all-computers.component';
import { HomeComponent } from './components/core/home/home.component';
import { TypeOfServiceComponent } from './components/type-of-service/type-of-service.component';
import { ServiceTrackingComponent } from './components/service-tracking/service-tracking.component';
import { PcServiceComponent } from './components/pc-service/pc-service.component';
import { GuaranteeBillComponent } from './components/guarantee-bill/guarantee-bill.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

const routes: Routes = [
  {path: 'customer', component: CustomerComponent},
  {path: 'all-computers', component: AllComputersComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'guarantee-bill', component: GuaranteeBillComponent},
  {path: 'pc-service', component: PcServiceComponent},
  {path: 'service-tracking', component: ServiceTrackingComponent},
  {path: 'type-of-service', component: TypeOfServiceComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
