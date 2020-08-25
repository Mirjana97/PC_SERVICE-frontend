import { ServiceTrackingService } from './services/service-tracking.service';
import { GuaranteeBillService } from './services/guarantee-bill.service';
import { PcServiceService } from './services/pc-service.service';
import { ComputerService } from './services/computer.service';
import { EmployeeService } from './services/employee.service';
import { CustomerService } from './services/customer.service';
import { TypeOfServiceService } from './services/type-of-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ComputerComponent } from './components/computer/computer.component';
import { PcServiceComponent } from './components/pc-service/pc-service.component';
import { TypeOfServiceComponent } from './components/type-of-service/type-of-service.component';
import { ServiceTrackingComponent } from './components/service-tracking/service-tracking.component';
import { GuaranteeBillComponent } from './components/guarantee-bill/guarantee-bill.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HomeComponent } from './components/core/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeOfServiceDialogComponent } from './components/dialogs/type-of-service-dialog//type-of-service-dialog/type-of-service-dialog.component';
import { EmployeeDialogComponent } from './components/dialogs/employee-dialog/employee-dialog.component';
import { CustomerDialogComponent } from './components/dialogs/customer-dialog/customer-dialog.component';
import { ComputerDialogComponent } from './components/dialogs/computer-dialog/computer-dialog.component';
import { ServiceTrackingDialogComponent } from './components/dialogs/service-tracking-dialog/service-tracking-dialog.component';
import { PcServiceDialogComponent } from './components/dialogs/pc-service-dialog/pc-service-dialog.component';
import { GuaranteeBillDialogComponent } from './components/dialogs/guarantee-bill-dialog/guarantee-bill-dialog.component';
import { AllComputersComponent } from './components/all-computers/all-computers.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthService } from './services/auth.service';
import { HttpInterceptorService } from './services/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    CustomerComponent,
    ComputerComponent,
    PcServiceComponent,
    TypeOfServiceComponent,
    ServiceTrackingComponent,
    GuaranteeBillComponent,
    HomeComponent,
    TypeOfServiceDialogComponent,
    EmployeeDialogComponent,
    CustomerDialogComponent,
    ComputerDialogComponent,
    ServiceTrackingDialogComponent,
    PcServiceDialogComponent,
    GuaranteeBillDialogComponent,
    AllComputersComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule, MatNativeDateModule, MatDatepickerModule,
    MatPaginatorModule, MatSortModule, NgbModule
  ],
  // tslint:disable-next-line: max-line-length
  providers: [TypeOfServiceService, CustomerService, EmployeeService, ComputerService, 
    PcServiceService, GuaranteeBillService, ServiceTrackingService, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }],
  // tslint:disable-next-line: max-line-length
  entryComponents:[TypeOfServiceDialogComponent, EmployeeDialogComponent, CustomerDialogComponent, ComputerDialogComponent, ServiceTrackingDialogComponent, PcServiceDialogComponent, GuaranteeBillDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
