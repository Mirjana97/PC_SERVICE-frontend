import { Employee } from './../../models/employee';
import { PcServiceDialogComponent } from './../dialogs/pc-service-dialog/pc-service-dialog.component';
import { TypeOfService } from './../../models/type_of_service';
import { Computer } from './../../models/computer';
import { PcServiceService } from './../../services/pc-service.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { PcService } from 'src/app/models/pc_service';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/auth/roles';

@Component({
  selector: 'app-pc-service',
  templateUrl: './pc-service.component.html',
  styleUrls: ['./pc-service.component.css']
})
export class PcServiceComponent implements OnInit {

  displayedColumns = ['serviceid', 'computer', 'typeofservice', 'employee', 'isfinishedservice', 'actions'];
  dataSource: MatTableDataSource<PcService>;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort: MatSort;

  constructor(public pcServiceService: PcServiceService,
    public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isUserLoggedIn() && this.authService.loggedInUserRoleIs(Role.EMPLOYEE)) {
      this.loadData();
    } else {
      this.authService.redirectToHome();
    }
  }


  public loadData() {
    this.pcServiceService.getAllPcServices().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);


      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, serviceid: number, computer: Computer, typeofservice: TypeOfService,
    employee: Employee, isfinishedservice: boolean) {
    const dialogRef = this.dialog.open(PcServiceDialogComponent, {
      data: {
        i: serviceid, serviceid: serviceid, computer: computer, typeofservice: typeofservice,
        employee: employee, isfinishedservice: isfinishedservice
      }
    });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
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
