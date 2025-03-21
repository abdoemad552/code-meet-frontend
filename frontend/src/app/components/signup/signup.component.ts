import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {SignupRequest} from '../../models/authentication/signup-request.dto';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupRequest: any = {};

  constructor(private authService: AuthenticationService) {
  }

  onSignup(): void {
    console.log(this.signupRequest);
    this.authService.signup(this.signupRequest);
  }
}
