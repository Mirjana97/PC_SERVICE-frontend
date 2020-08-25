import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationRequest } from 'src/app/models/auth/registration-request';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private snackBar:MatSnackBar,private authService:AuthService
    ,private route:ActivatedRoute,private router:Router) { }

  token:string;

  registrationForm = new FormGroup({
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  ngOnInit(): void {
    if (this.authService.getToken())
    this.router.navigate(['home']);
  }

  onSubmit() {
    let registrationRequest: RegistrationRequest = new RegistrationRequest();
    registrationRequest.name = this.registrationForm.get('name').value;
    registrationRequest.surname = this.registrationForm.get('surname').value;
    registrationRequest.phone = this.registrationForm.get('phone').value;
    registrationRequest.address = this.registrationForm.get('address').value;
    registrationRequest.username = this.registrationForm.get('username').value;
    registrationRequest.password = this.registrationForm.get('password').value;

    registrationRequest.username = registrationRequest.username.trim();

    this.authService.register(registrationRequest).subscribe(user => {
      if (user) {
        this.showSnackbar("Registration complete. Redirecting to login page...");
        this.registrationForm.disable();
        this.waitAndRedirectToLogin(1500);
      } else {
        this.showSnackbar("Username already exists!");
      }
    })
  }

  waitAndRedirectToLogin(milliseconds: number) {
    setTimeout(() => 
    {
        this.router.navigate(['login'])
    },
    milliseconds);
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 2500
    })
  }

}
