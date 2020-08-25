import { CustomerService } from './../../../services/customer.service';
import { ComputerService } from './../../../services/computer.service';
import { Computer } from './../../../models/computer';
import { Customer } from './../../../models/customer';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
 selector: 'app-computer-dialog',
 templateUrl: './computer-dialog.component.html',
 styleUrls: ['./computer-dialog.component.css']
})
export class ComputerDialogComponent implements OnInit {
 customers: Customer[];
 public flag: number;
 constructor(public snackBar: MatSnackBar,
             public dialogRef: MatDialogRef<ComputerDialogComponent>,
             @Inject(MAT_DIALOG_DATA) public data: Computer,
             public computerService: ComputerService,
            public customerService: CustomerService
 ) { }

 ngOnInit() {
  this.customerService.getAllCustomers().subscribe(customers =>
    this.customers = customers
  );
 }


 public add(): void {
   this.data.computerid = -1;
   this.computerService.addComputer(this.data);
   this.snackBar.open("Successfully added computer", "OK", { duration: 2500 });
 }

 public update(): void {
   this.computerService.updateComputer(this.data);
   this.snackBar.open("Successfully modified computer", "OK", { duration: 2500 });
 }

 public delete(): void {
   this.computerService.deleteComputer(this.data.computerid);
   this.snackBar.open("Successfully deleted computer", "OK", { duration: 2000 });
 }

 public cancel(): void {
   this.dialogRef.close();
   this.snackBar.open("Cancel", "OK", { duration: 1000 });
 }

 compareTo(a, b) {
  return a.customerid == b.customerid;
}

}
