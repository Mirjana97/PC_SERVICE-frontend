import { Computer } from './../../models/computer';
import { ServiceTrackingDialogComponent } from './../dialogs/service-tracking-dialog/service-tracking-dialog.component';
import { Customer } from './../../models/customer';
import { Employee } from './../../models/employee';
import { ServiceTrackingService } from './../../services/service-tracking.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { ServiceTracking } from 'src/app/models/service_tracking';
import { AuthService } from 'src/app/services/auth.service';

@Component({
 selector: 'app-service-tracking',
 templateUrl: './service-tracking.component.html',
 styleUrls: ['./service-tracking.component.css']
})
export class ServiceTrackingComponent implements OnInit {
 // tslint:disable-next-line: max-line-length
 displayedColumns = ['confirmationid', 'employee', 'customer', 'computer', 'appointmentdate', 'computerreceived', 'computerisserviced', 'takingbackdate', 'actions'];
 dataSource: MatTableDataSource<ServiceTracking>;

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

 constructor(public serviceTrackingService: ServiceTrackingService, public dialog: MatDialog, private authService: AuthService) { }

 ngOnInit() {
  if (this.authService.isUserLoggedIn()) {
    this.loadData();
  } else {
    this.authService.redirectToHome();
  }
 }

 public loadData() {
  this.serviceTrackingService.getAllServiceTrackings().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);

    //pretraga po Employee
    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return key === 'employee' ? currentTerm + data.employee.employeename : currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

     //sortiranje po employee
    this.dataSource.sortingDataAccessor = (data, property) => {
      switch(property) {
        case 'employee': return data.employee.employeename.toLocaleLowerCase();
        default: return data[property];
      }
    };

        //pretraga po customer
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'customer' ? currentTerm + data.customer.customername : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

         //sortiranje po customer
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch(property) {
            case 'customer': return data.customer.customername.toLocaleLowerCase();
            default: return data[property];
          }
        };

                //pretraga po customer
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'customer' ? currentTerm + data.customer.customername : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

         //sortiranje po customer
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch(property) {
            case 'customer': return data.customer.customername.toLocaleLowerCase();
            default: return data[property];
          }
        };

    //pretraga po computer
    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return key === 'computer' ? currentTerm + data.computer.serialnumber : currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

     //sortiranje po computer
    this.dataSource.sortingDataAccessor = (data, property) => {
      switch(property) {
        case 'computer': return data.computer.serialnumber;
        default: return data[property];
      }
    };

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });

}

 // tslint:disable-next-line: max-line-length
 public openDialog(flag: number, confirmationid: number, employee: Employee, customer: Customer, computer: Computer , appointmentdate: Date, computerreceived: boolean, computerisserviced: boolean, takingbackdate: Date ) {
   // tslint:disable-next-line: max-line-length
   const dialogRef = this.dialog.open(ServiceTrackingDialogComponent, { data: { confirmationid: confirmationid, employee: employee, customer: customer, computer: computer, appointmentdate: appointmentdate, computerreceived: computerreceived, computerisserviced: computerisserviced,takingbackdate: takingbackdate  } });
   dialogRef.componentInstance.flag = flag;

   dialogRef.afterClosed().subscribe(result => {
     if (result == 1){
        this.loadData();
     }

   });
 }

 public getLoggedInRole() {
   return this.authService.getLoggedInRole();
 }

 applyFilter(filterValue: string){
  filterValue = filterValue.trim();
  filterValue = filterValue.toLocaleLowerCase();
  this.dataSource.filter = filterValue;
}
}
