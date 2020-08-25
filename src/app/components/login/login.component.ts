import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/models/auth/login-response';
import { LoginRequest } from 'src/app/models/auth/login-request';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private snackBar: MatSnackBar, private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.getToken())
      this.router.navigate(['home']);
  }

  onSubmit() {
    let password: string = this.loginForm.get('password').value;
    let username: string = this.loginForm.get('username').value;

    let loginRequest: LoginRequest = new LoginRequest();
    loginRequest.username = username;
    loginRequest.password = password;

    this.authService.login(loginRequest).subscribe(loginResponse => {
      if (loginResponse && loginResponse.token) {
        let token: string = loginResponse.token;
        this.authService.extractClaims(token).subscribe(claims => {
          this.authService.setLoggedInRole(claims.role);
          this.authService.setToken(token);
          this.authService.setLoggedInUsername(claims.sub);
          this.router.navigate(['home']);
        })
      }
      else
        this.showSnackbar("Incorrect username/password combination.")
    })
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, "X", {
      duration: 2500
    })
  }
}
