import { Employee } from './../models/employee';
import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {
    private readonly API_URL = 'http://localhost:8083/employee/';

    dataChange: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

    constructor(private httpClient: HttpClient) { }

    public getAllEmployees(): Observable<Employee[]> {
        this.httpClient.get<Employee[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        });
        return this.dataChange.asObservable();
    }

    public addEmployee(employee: Employee): void {
        this.httpClient.post(this.API_URL, employee).subscribe();
    }

    public editEmployee(employee: Employee): void {
        this.httpClient.put(this.API_URL, employee).subscribe();
    }

    public deleteEmployee(employeeid: number): void {
        this.httpClient.delete(this.API_URL + employeeid).subscribe();
    }
}
