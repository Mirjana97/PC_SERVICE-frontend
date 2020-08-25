import { TypeOfServiceDialogComponent } from './../dialogs/type-of-service-dialog/type-of-service-dialog/type-of-service-dialog.component';
import { TypeOfServiceService } from './../../services/type-of-service.service';
import { TypeOfService } from './../../models/type_of_service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { Role } from 'src/app/models/auth/roles';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-type-of-service',
  templateUrl: './type-of-service.component.html',
  styleUrls: ['./type-of-service.component.css']
})
export class TypeOfServiceComponent implements OnInit {

  displayedColumns = ['typeofserviceid', 'typeofservicename', 'typeofserviceprice', 'actions'];
  dataSource: MatTableDataSource<TypeOfService>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public httpClient: HttpClient, public typeOfServiceService: TypeOfServiceService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isUserLoggedIn() && this.authService.loggedInUserRoleIs(Role.EMPLOYEE)) {
      this.loadData();
    } else {
      this.authService.redirectToHome();
    }
  }

  public loadData() {
    this.typeOfServiceService.getAllTypeOfServices().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, typeofserviceid: number, typeofservicename: string,  typeofserviceprice: number){
   const dialogRef = this.dialog.open(TypeOfServiceDialogComponent,
                                    {data:{typeofserviceid: typeofserviceid, typeofservicename: typeofservicename,  typeofserviceprice: typeofserviceprice}}
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
