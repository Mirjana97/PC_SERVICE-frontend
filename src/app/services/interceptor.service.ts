import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class HttpInterceptorService {
  
    constructor(private _auth: AuthService) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers;
        if (req.url.includes('auth')) {
            headers = req.headers.set('Content-Type', 'application/json');
        } else {
            headers = req.headers
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this._auth.getToken());
        }
        const authReq = req.clone({ headers });
        return next.handle(authReq)
            .pipe(
                catchError(this.handleServerErrors)
            );
    }
  
    handleServerErrors(error: HttpErrorResponse) {
        if (error.status === 404) {
            return throwError(error);
        }
        return throwError(error.error);
    }
  }