import { GuaranteeBillDialogComponent } from './../dialogs/guarantee-bill-dialog/guarantee-bill-dialog.component';
import { GuaranteeBill } from './../../models/guarantee_bill';
import { GuaranteeBillService } from './../../services/guarantee-bill.service';
import { PcService } from './../../models/pc_service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-guarantee-bill',
  templateUrl: './guarantee-bill.component.html',
  styleUrls: ['./guarantee-bill.component.css']
})
export class GuaranteeBillComponent implements OnInit {

  displayedColumns = ['guaranteebillid', 'guaranteeexpires', 'servicefinisheddate', 'total', 'pcservice', 'actions'];
  dataSource: MatTableDataSource<GuaranteeBill>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public guaranteeBillService: GuaranteeBillService,
              public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.loadData();
    } else {
      this.authService.redirectToHome();
    }
  }


  public loadData() {
    this.guaranteeBillService.getAllGuaranteeBill().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      });

    }
    public openDialog(flag: number, guaranteebillid: number, guaranteeexpires: Date, servicefinisheddate: Date,
      total: number, pcservice: PcService) {
      const dialogRef = this.dialog.open(GuaranteeBillDialogComponent, {
        // tslint:disable-next-line: max-line-length
        data: { i: guaranteebillid, guaranteebillid: guaranteebillid, guaranteeexpires: guaranteeexpires, servicefinisheddate: servicefinisheddate,
          total: total, pcservice: pcservice
        }
      });
      dialogRef.componentInstance.flag = flag;

      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
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
