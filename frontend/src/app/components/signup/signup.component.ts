import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import { UserInfoResponse } from '../../models/user/user-info-response.dto';
import {FormsModule} from '@angular/forms';
import {of} from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupRequest: any = {};

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  onSignup(): void {
    console.log(this.signupRequest);
    this.authService.signup(this.signupRequest)
      .subscribe((response: UserInfoResponse) => {
          console.log(response);
          sessionStorage.setItem("userInfo", JSON.stringify(response));
          this.authService.authenticated = of(true);
          this.router.navigateByUrl('/home').catch(err => {
            console.error('Navigation error:', err);
          });
        }
      );
  }
}
