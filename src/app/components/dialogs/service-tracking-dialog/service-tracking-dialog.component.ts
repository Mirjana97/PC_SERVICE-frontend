import { Computer } from './../../../models/computer';
import { ServiceTracking } from './../../../models/service_tracking';
import { CustomerService } from './../../../services/customer.service';
import { EmployeeService } from './../../../services/employee.service';
import { ServiceTrackingService } from './../../../services/service-tracking.service';
import { Customer } from './../../../models/customer';
import { Employee } from './../../../models/employee';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ComputerService } from 'src/app/services/computer.service';


@Component({
 selector: 'app-service-tracking-dialog',
 templateUrl: './service-tracking-dialog.component.html',
 styleUrls: ['./service-tracking-dialog.component.css']
})
export class ServiceTrackingDialogComponent implements OnInit {
 employees: Employee[];
 customers: Customer[];
 computers: Computer[];
 public flag: number;
 constructor(public snackBar: MatSnackBar,
   public dialogRef: MatDialogRef<ServiceTrackingDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: ServiceTracking,
   public serviceTrackingService: ServiceTrackingService,
   public employeeService: EmployeeService,
   public customerService: CustomerService,
   public computerService: ComputerService
 ) { }

 ngOnInit() {
   this.employeeService.getAllEmployees().subscribe(employees =>
     this.employees = employees
   );

   this.customerService.getAllCustomers().subscribe(customers =>
    this.customers = customers
  );

  this.computerService.getAllComputers().subscribe(computers =>
    this.computers = computers
  );
 }
 compareTo(a, b) {
   return a.employeeid == b.employeeid;
 }

 compareTo2(a, b) {
  return a.customerid == b.customerid;
}

compareTo3(a, b) {
  return a.computerid == b.computerid;
}

 public add(): void {
   this.data.confirmationid = -1;
   this.serviceTrackingService.addServiceTracking(this.data);
   this.snackBar.open("Successfully added service tracking", "OK", { duration: 2500 });
 }

 public update(): void {
   this.serviceTrackingService.updateServiceTracking(this.data);
   this.snackBar.open("Successfully modified service tracking", "OK", { duration: 2500 });
 }

 public delete(): void {
   this.serviceTrackingService.deleteServiceTracking(this.data.confirmationid);
   this.snackBar.open("Successfully deleted service tracking", "OK", { duration: 2000 });
 }

 public cancel(): void {
   this.dialogRef.close();
   this.snackBar.open("Canceled", "Ok", { duration: 1000 });
 }
}
