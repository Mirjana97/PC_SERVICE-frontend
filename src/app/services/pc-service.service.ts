import { PcService } from './../models/pc_service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class PcServiceService {

    pcServiceService: PcServiceService;
    private readonly API_URL = 'http://localhost:8083/pcService/';

    dataChange: BehaviorSubject<PcService[]> = new
    BehaviorSubject<PcService[]>([]);

    constructor(private httpClient: HttpClient) {}

    public getAllPcServices(): Observable<PcService[]> {
      this.httpClient.get<PcService[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      });
      return this.dataChange.asObservable();
  }

    public addPcService(pcService: PcService): void {
        this.httpClient.post(this.API_URL, pcService).subscribe();
    }

    public updatePcService(pcService: PcService): void {
        this.httpClient.put(this.API_URL, pcService).subscribe();
    }

    public deletePcService(serviceid: number): void {
        this.httpClient.delete(this.API_URL + serviceid).subscribe();
    }

}
