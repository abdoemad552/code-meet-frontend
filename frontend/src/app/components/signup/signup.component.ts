import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import { UserInfoResponse } from '../../models/user/user-info-response.dto';
import {FormsModule} from '@angular/forms';
import {SignupRequest} from '../../models/authentication/signup-request.dto';
import {NgIf} from '@angular/common';
import {fadeInOut} from '../../shared/animations';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, NgIf],
  animations: [fadeInOut],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupRequest: SignupRequest = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    gender: 'MALE'
  };
  showPassword: boolean = false;
  selectedCountryCode: string = '+20';

  constructor(private authService: AuthenticationService) {
  }

  onSignup(): void {
    console.log(this.signupRequest);
    this.authService.signup(this.signupRequest)
      .subscribe({
        next: (userInfo: UserInfoResponse) => {
          console.log(userInfo);
          this.authService.initUser(userInfo);
        },
        error: err => { console.log(err); }
      });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
