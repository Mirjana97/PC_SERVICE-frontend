import { ServiceTracking } from './../models/service_tracking';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceTrackingService {
   private readonly API_URL = 'http://localhost:8083/serviceTracking/';

   dataChange: BehaviorSubject<ServiceTracking[]> = new BehaviorSubject<ServiceTracking[]>([]);
   constructor(private httpClient: HttpClient) { }
   public getAllServiceTrackings(): Observable<ServiceTracking[]> {
       this.httpClient.get<ServiceTracking[]>(this.API_URL).subscribe(data => {
           this.dataChange.next(data);
       },
           (error: HttpErrorResponse) => {
               console.log(error.name + ' ' + error.message)
           });
       return this.dataChange.asObservable();
   }
   public addServiceTracking(serviceTracking: ServiceTracking): void {
       this.httpClient.post(this.API_URL, serviceTracking).subscribe();
   }
   public updateServiceTracking(serviceTracking: ServiceTracking): void {
       this.httpClient.put(this.API_URL, serviceTracking).subscribe();
   }
   public deleteServiceTracking(confirmationid: number): void {
       this.httpClient.delete(this.API_URL + confirmationid).subscribe();
   }
}
