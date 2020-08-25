import { GuaranteeBill } from './../models/guarantee_bill';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GuaranteeBillService {

    private readonly API_URL = 'http://localhost:8083/guaranteeBill/';

    dataChange: BehaviorSubject<GuaranteeBill[]> = new BehaviorSubject<GuaranteeBill[]>([]);

    constructor(private httpClient: HttpClient) {}

    public getAllGuaranteeBill(): Observable<GuaranteeBill[]> {
        this.httpClient.get<GuaranteeBill[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });

        return this.dataChange.asObservable();
    }

    public addGuaranteeBill(guaranteeBill: GuaranteeBill): void {
        this.httpClient.post(this.API_URL, guaranteeBill).subscribe();
    }

    public updateGuaranteeBill(guaranteeBill: GuaranteeBill): void {
        this.httpClient.put(this.API_URL, guaranteeBill).subscribe();
    }

    public deleteGuaranteeBill(guaranteebillid: number): void {
        console.log(this.API_URL + guaranteebillid);
        this.httpClient.delete(this.API_URL + guaranteebillid).subscribe();
    }
}
