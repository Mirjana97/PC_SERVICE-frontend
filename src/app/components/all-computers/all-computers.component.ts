import { ComputerService } from 'src/app/services/computer.service';
import { Computer } from './../../models/computer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/auth/roles';

@Component({
  selector: 'app-all-computers',
  templateUrl: './all-computers.component.html',
  styleUrls: ['./all-computers.component.css']
})
export class AllComputersComponent implements OnInit {

  displayedColumns = ['computerid', 'serialnumber', 'manufacturername', 'modelname' , 'customer', 'typeofpc'];
  dataSource: MatTableDataSource<Computer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //selectedCustomer: Customer;


  constructor(public httpClient: HttpClient, public computerService: ComputerService, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isUserLoggedIn() && this.authService.loggedInUserRoleIs(Role.EMPLOYEE)) {
      this.loadData();
    } else {
      this.authService.redirectToHome();
    }
  }

  public loadData() {
    this.computerService.getAllComputers().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  // tslint:disable-next-line: max-line-length
/*  public openDialog(flag: number, customerid: number, customername: string, customersurname: string , customerphone: string , customeradress: string, customerusername: string, customerpassword: string){
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
 }*/

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}


