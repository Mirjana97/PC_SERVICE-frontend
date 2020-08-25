import { TypeOfServiceService } from './../../../../services/type-of-service.service';
import { TypeOfService } from './../../../../models/type_of_service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-type-of-service-dialog',
  templateUrl: './type-of-service-dialog.component.html',
  styleUrls: ['./type-of-service-dialog.component.css']
})
export class TypeOfServiceDialogComponent implements OnInit {
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<TypeOfServiceDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: TypeOfService,
              public typeOfServiceService: TypeOfServiceService
  ) { }

  ngOnInit() {
  }

  public add(): void {
    this.typeOfServiceService.addTypeOfService(this.data);
    this.snackBar.open("Type of service was successfully added: " + this.data.typeofservicename, "OK", {
      duration: 2500
    })
  }

  public update(): void {
    this.typeOfServiceService.editTypeOfService(this.data);
    this.snackBar.open("Type of service was successfully modified:" + this.data.typeofservicename, "OK", {
      duration: 2500
    })
  }

  public delete(): void {
    console.log("Delete type of service with id: " + this.data.typeofserviceid);
    this.typeOfServiceService.deleteTypeOfService(this.data.typeofserviceid);
    this.snackBar.open("Type of service was successfully deleted " + this.data.typeofservicename, "OK", {
      duration: 1500
    })
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Cancel", "OK")
  }

}
