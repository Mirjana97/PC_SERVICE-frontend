import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';

@Injectable()
export class CustomerService {
    private readonly API_URL = 'http://localhost:8083/customer/';

    dataChange: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

    constructor(private httpClient: HttpClient) { }

    public getAllCustomers(): Observable<Customer[]> {
        this.httpClient.get<Customer[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        });
        return this.dataChange.asObservable();
    }

    public addCustomer(customer: Customer): void {
        this.httpClient.post(this.API_URL, customer).subscribe();
    }

    public editCustomer(customer: Customer): void {
        this.httpClient.put(this.API_URL, customer).subscribe();
    }

    public deleteCustomer(customerid: number): void {
        this.httpClient.delete(this.API_URL + customerid).subscribe();
    }
}
