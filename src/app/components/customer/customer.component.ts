import { CustomerService } from './../../services/customer.service';
import { Customer } from './../../models/customer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { CustomerDialogComponent } from '../dialogs/customer-dialog/customer-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/auth/roles';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns = ['customerid', 'customername', 'customersurname', 'customerphone' , 'customeradress', 'customerusername', 'customerpassword' , 'actions'];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedCustomer: Customer;


  constructor(public httpClient: HttpClient, public customerService: CustomerService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isUserLoggedIn() && this.authService.loggedInUserRoleIs(Role.EMPLOYEE)) {
      this.loadData();
    } else {
      this.authService.redirectToHome();
    }
  }

  public loadData() {
    this.customerService.getAllCustomers().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  // tslint:disable-next-line: max-line-length
  public openDialog(flag: number, customerid: number, customername: string, customersurname: string , customerphone: string , customeradress: string, customerusername: string, customerpassword: string){
   const dialogRef = this.dialog.open(CustomerDialogComponent,
                                    // tslint:disable-next-line: max-line-length
                                    {data:{customerid, customername, customersurname, customerphone, customeradress, customerusername, customerpassword }}
    );


   dialogRef.componentInstance.flag = flag;

   dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.loadData();
      }
    });
  }


 selectRow(row){
  this.selectedCustomer = row;
 }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}


