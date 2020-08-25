import { Computer } from './../models/computer';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ComputerService {
 computerService: ComputerService;
 private readonly API_URL = 'http://localhost:8083/computer/';
 private readonly API_URL_BYID = 'http://localhost:8083/computerByCustomer/';

dataChange: BehaviorSubject<Computer[]> = new BehaviorSubject<Computer[]>([]);

 constructor(private httpClient: HttpClient) { }

 public getComputersByCustomer(customerid): Observable<Computer[]> {
  this.httpClient.get<Computer[]>(this.API_URL_BYID + customerid)
  .subscribe(data => {
      this.dataChange.next(data);
  },
  (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
  });
  return this.dataChange.asObservable();
}

 public getAllComputers(): Observable<Computer[]> {
  this.httpClient.get<Computer[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
  });
  return this.dataChange.asObservable();
}

 public getComputerByCustomer(customerid): Observable<Computer[]> {
   this.httpClient.get<Computer[]>(this.API_URL_BYID + customerid).subscribe(data => {
     this.dataChange.next(data);
   },
     (error: HttpErrorResponse) => {
       console.log(error.name + ' ' + error.message);
     });
   return this.dataChange.asObservable();
 }

 public addComputer(computer: Computer): void {
   this.httpClient.post(this.API_URL, computer).subscribe();
 }

 public updateComputer(computer: Computer): void {
   this.httpClient.put(this.API_URL, computer).subscribe();
 }

 public deleteComputer(computerid: number): void {
   this.httpClient.delete(this.API_URL + computerid).subscribe();
 }
}
