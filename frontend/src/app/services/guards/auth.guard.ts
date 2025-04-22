import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    // Note: You need to uncomment the following lines to use authentication again
    //       and remove "return true;" statement.

    // if (!!sessionStorage.getItem("userInfo")) {
    //   return true;
    // }
    // this.router.navigateByUrl("/login")
    //   .catch(reason => console.log(reason));
    // return false;
    return true;
  }
}
