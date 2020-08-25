import { TypeOfService } from './../models/type_of_service';
import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TypeOfServiceService {
    private readonly API_URL = 'http://localhost:8083/typeOfService/';

    dataChange: BehaviorSubject<TypeOfService[]> = new BehaviorSubject<TypeOfService[]>([]);

    constructor(private httpClient: HttpClient) { }

    public getAllTypeOfServices(): Observable<TypeOfService[]> {
        this.httpClient.get<TypeOfService[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        });
        return this.dataChange.asObservable();
    }

    public addTypeOfService(typeOfService: TypeOfService): void {
        this.httpClient.post(this.API_URL, typeOfService).subscribe();
    }

    public editTypeOfService(typeOfService: TypeOfService): void {
        this.httpClient.put(this.API_URL, typeOfService).subscribe();
    }

    public deleteTypeOfService(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}
