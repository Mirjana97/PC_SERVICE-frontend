import { CustomerService } from './../../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';



@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<CustomerDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Customer,
              public customerService: CustomerService
  ) { }

  ngOnInit() {
  }



  public add(): void {
    this.customerService.addCustomer(this.data);
    this.snackBar.open("Customer successfully added: " + this.data.customername, "OK ", {
      duration: 2500
    })
  }

  public update(): void {
    this.customerService.editCustomer(this.data);
    this.snackBar.open("Customer successfully modified: " + this.data.customername, "OK", {
      duration: 2500
    })
  }

  public delete(): void {
    console.log("Delete customer with id: " + this.data.customerid);
    this.customerService.deleteCustomer(this.data.customerid);
    this.snackBar.open("Customer successfully deleted: " + this.data.customername, "OK ", {
      duration: 1500
    })
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Cancel", "OK")
  }

}

