import { EmployeeDialogComponent } from './../dialogs/employee-dialog/employee-dialog.component';
import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../models/employee';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/auth/roles';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns = ['employeeid', 'employeename', 'employeesurname', 'employeephone' , 'employeeadress', 'employeeusername', 'employeepassword' , 'actions'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public httpClient: HttpClient, public employeeService: EmployeeService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isUserLoggedIn() && this.authService.loggedInUserRoleIs(Role.EMPLOYEE)) {
      this.loadData();
    } else {
      this.authService.redirectToHome();
    }
  }

  public loadData() {
    this.employeeService.getAllEmployees().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  // tslint:disable-next-line: max-line-length
  public openDialog(flag: number, employeeid: number, employeename: string, employeesurname: string , employeephone: string , employeeadress: string, employeeusername: string, employeepassword: string){
   const dialogRef = this.dialog.open(EmployeeDialogComponent,
                                    // tslint:disable-next-line: max-line-length
                                    {data:{employeeid, employeename, employeesurname, employeephone, employeeadress, employeeusername, employeepassword }}
    );


   dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result =>{
      if (result == 1)
        this.loadData();
    });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}

