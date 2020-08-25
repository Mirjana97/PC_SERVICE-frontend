import { EmployeeService } from './../../../services/employee.service';
import { Employee } from './../../../models/employee';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<EmployeeDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Employee,
              public employeeService: EmployeeService
  ) { }

  ngOnInit() {
  }

  public add(): void {
    this.employeeService.addEmployee(this.data);
    this.snackBar.open("Employee successfully added: " + this.data.employeename, "OK ", {
      duration: 2500
    })
  }

  public update(): void {
    this.employeeService.editEmployee(this.data);
    this.snackBar.open("Customer successfully modified: " + this.data.employeename, "OK", {
      duration: 2500
    })
  }

  public delete(): void {
    console.log("Delete employee with id: " + this.data.employeeid);
    this.employeeService.deleteEmployee(this.data.employeeid);
    this.snackBar.open("Customer successfully deleted: " + this.data.employeename, "OK ", {
      duration: 1500
    })
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Cancel", "OK")
  }

}
