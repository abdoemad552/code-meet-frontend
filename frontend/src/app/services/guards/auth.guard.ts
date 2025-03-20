// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  canActivate(): boolean {
    if (!!sessionStorage.getItem("userInfo")) {
      return true;
    }
    this.router.navigateByUrl("/login");
    return false;

  //   this.authService.authenticated.subscribe(
  //     response => {
  //       this.status = response;
  //     }
  //   );
  //
  //   if (this.status) {
  //     return true;
  //   } else {
  //     // Optionally, you might store the attempted URL here for redirect after login.
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  }
}
