import { LoginRequest } from "../models/auth/login-request";
import { LoginResponse } from "../models/auth/login-response";
import { RegistrationRequest } from "../models/auth/registration-request";
import { Claims } from "../models/auth/claims";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    private readonly AUTH_URL = "http://localhost:8083/auth";

    private logged = new BehaviorSubject(true);
    isLoggedIn = this.logged.asObservable();

    constructor(private httpClient: HttpClient, private router: Router) { }

    changeIsLoggedIn(loggedIn:boolean)
    {
        this.logged.next(loggedIn)
    }

    login(loginRequest:LoginRequest)
    {
        return this.httpClient.post<LoginResponse>(this.AUTH_URL+"/login", loginRequest);
    }

    register(registrationRequest: RegistrationRequest)
    {
        return this.httpClient.post(this.AUTH_URL+"/register", registrationRequest);
    }

    setToken(token:string)
    {
        this.changeIsLoggedIn(true);
        sessionStorage.setItem('token',token);
    }

    getToken()
    {
        return sessionStorage.getItem('token');
    }

    setLoggedInRole(role:string)
    {
        sessionStorage.setItem('role',role);
    }

    getLoggedInRole(): string
    {
        return sessionStorage.getItem('role');
    }

    setLoggedInUsername(username:string)
    {
        sessionStorage.setItem('username',username);
    }

    getLoggedInUsername()
    {
        return sessionStorage.getItem('username');
    }

    extractClaims(token:string)
    {
        let params = new HttpParams();
        params = params.append('token', token);
        return this.httpClient.get<Claims>(this.AUTH_URL+"/claims", {params: params})
    }

    clearSession()
    {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('username');
        this.changeIsLoggedIn(false);
    }

    isUserLoggedIn() {
        if (this.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    loggedInUserRoleIs(role: string): boolean {
        let loggedInRole: string = this.getLoggedInRole();
        if (loggedInRole === role) {
            return true;
        } else {
            return false;
        }
    }

    redirectToHome() {
        this.router.navigate(['home']);
    }
}