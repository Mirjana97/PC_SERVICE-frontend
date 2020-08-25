import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn = false;
  title = 'A&M PC Service';

  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.trackLoginStatusAndHandleMenuItems();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  trackLoginStatusAndHandleMenuItems() {
    if(this.authService.getToken()) {
      this.authService.changeIsLoggedIn(true);
    }
    else
      this.authService.changeIsLoggedIn(false);

    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn=isLoggedIn;
    })
  }

  getLoggedInRole(): string {
      return this.authService.getLoggedInRole();
  }

  logout() {
    this.authService.clearSession();
    this.router.navigate(['login']);
  }

}
