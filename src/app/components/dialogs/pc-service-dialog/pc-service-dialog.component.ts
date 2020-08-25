import { EmployeeService } from './../../../services/employee.service';
import { TypeOfServiceService } from './../../../services/type-of-service.service';
import { ComputerService } from './../../../services/computer.service';
import { PcServiceService } from './../../../services/pc-service.service';
import { Employee } from './../../../models/employee';
import { TypeOfService } from './../../../models/type_of_service';
import { Computer } from './../../../models/computer';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PcService } from 'src/app/models/pc_service';
import { from } from 'rxjs';

@Component({
  selector: 'app-pc-service-dialog',
  templateUrl: './pc-service-dialog.component.html',
  styleUrls: ['./pc-service-dialog.component.css']
})
export class PcServiceDialogComponent implements OnInit {

  computers: Computer[];
  typeofservices: TypeOfService[];
  employees: Employee[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PcServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PcService,
    public pcServiceService: PcServiceService,
    public computerService: ComputerService,
    public typeofserviceService: TypeOfServiceService,
    public employeeService: EmployeeService) { }

  ngOnInit() {
    this.computerService.getAllComputers().subscribe(computers =>
      this.computers = computers
    );
    this.typeofserviceService.getAllTypeOfServices().subscribe(typeofservices =>
      this.typeofservices = typeofservices
    );
    this.employeeService.getAllEmployees().subscribe(employees =>
      this.employees = employees
    );
  }

  public add(): void {
    this.data.serviceid = -1; // moze i bez
    this.pcServiceService.addPcService(this.data);
    this.snackBar.open("Successfully added pc service!", "OK", {duration: 2500});
  }

  public update(): void {
    this.pcServiceService.updatePcService(this.data);
    this.snackBar.open("Successfully modified pc service!", "OK",
      {duration: 2500});
  }

  public delete(): void {
    this.pcServiceService.deletePcService(this.data.serviceid);
    this.snackBar.open("Successfully deleted pc service!", "OK", {duration: 2500});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Canceled", "OK", {duration: 1000});
  }

  public compareTo(a, b) {
    return a.computerid == b.computerid;
  }


  public compareTo2(a, b) {
    return a.typeodserviceid == b.typeodserviceid;
  }
  public compareTo3(a, b) {
    return a.employeeid == b.employeeid;
  }

}
