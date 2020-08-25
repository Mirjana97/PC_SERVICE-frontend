import { GuaranteeBillService } from './../../../services/guarantee-bill.service';
import { GuaranteeBill } from './../../../models/guarantee_bill';
import { PcService } from './../../../models/pc_service';
import { PcServiceService } from './../../../services/pc-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';

@Component({
  selector: 'app-guarantee-bill-dialog',
  templateUrl: './guarantee-bill-dialog.component.html',
  styleUrls: ['./guarantee-bill-dialog.component.css']
})
export class GuaranteeBillDialogComponent implements OnInit {

  pcservices: PcService[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GuaranteeBillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GuaranteeBill,
    public guaranteeBillService: GuaranteeBillService,
    public pcServiceService: PcServiceService) { }

  ngOnInit() {
    this.pcServiceService.getAllPcServices().subscribe(pcservices =>
      this.pcservices = pcservices
    );
  }

  public add(): void {
    this.data.guaranteebillid = -1; // moze i bez
    this.guaranteeBillService.addGuaranteeBill(this.data);
    this.snackBar.open("Successfully added guarantee bill", "OK", {duration: 2500});
  }

  public update(): void {
    this.guaranteeBillService.updateGuaranteeBill(this.data);
    this.snackBar.open("Successfully modified guarantee bill", "OK", {duration: 2500});
  }

  public delete(): void {
    this.guaranteeBillService.deleteGuaranteeBill(this.data.guaranteebillid);
    this.snackBar.open("Successfully deleted guarantee bill", "OK", {duration: 2500});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Canceled", "OK", {duration: 1000});
  }

  public compareTo(a, b) {
    return a.serviceid == b.serviceid;
  }

}
