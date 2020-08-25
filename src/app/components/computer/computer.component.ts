import { ComputerDialogComponent } from './../dialogs/computer-dialog/computer-dialog.component';
import { ComputerService } from './../../services/computer.service';
import { Customer } from './../../models/customer';
import { Computer } from './../../models/computer';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/auth/roles';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit {
  displayedColumns = ['computerid', 'serialnumber', 'manufacturername', 'modelname', 'customer', 'typeofpc', 'actions'];
  dataSource: MatTableDataSource<Computer>;

  @Input() selectedCustomer: Customer;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public computerService: ComputerService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isUserLoggedIn() && this.authService.loggedInUserRoleIs(Role.EMPLOYEE)) {
      this.loadData();
    } else {
      this.authService.redirectToHome();
    }
  }

  ngOnChanges() {
    if (this.selectedCustomer.customerid) {
      this.loadData();
    }
  }


  public loadData() {
    this.computerService.getComputerByCustomer(this.selectedCustomer.customerid).subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);

        //pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'customer' ? currentTerm + data.customer.customername : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        //sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch(property) {
            case 'customer': return data.customer.customername.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     });
  }
public openDialog(flag: number, computerid: number, serialnumber: number, manufacturername: string, modelname: string,
                  customer: Customer, typeofpc: string) {
                    const dialogRef = this.dialog.open(ComputerDialogComponent, {
                      data: {
                        // tslint:disable-next-line: max-line-length
                        i: computerid, computerid: computerid, serialnumber: serialnumber, manufacturername: manufacturername, modelname: modelname,
                        customer: customer, typeofpc: typeofpc
                      }
});
                    dialogRef.componentInstance.flag = flag;

                    if (flag == 1) {
                      dialogRef.componentInstance.data.customer = this.selectedCustomer;
                    }

                    dialogRef.afterClosed().subscribe(result => {
                      if (result == 1){
                         this.loadData();
                      }

                    });
                  }


                  applyFilter(filterValue: string){
                   filterValue = filterValue.trim();
                   filterValue = filterValue.toLocaleLowerCase();
                   this.dataSource.filter = filterValue;
                 }
                 }
