import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {ownerExists} from '../../shared/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (ownerExists()) {
      return true;
    }
    this.router.navigateByUrl("/login");
    return false;
  }
}
