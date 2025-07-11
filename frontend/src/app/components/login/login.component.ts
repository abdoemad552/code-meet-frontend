import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormsModule} from '@angular/forms';
import {LoginRequest} from '../../models/authentication/login-request.dto';
import {NgIf} from '@angular/common';
import {fadeInOut} from '../../shared/animations';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, NgIf],
  animations: [fadeInOut],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest: LoginRequest = { username: '', password: '' };
  showPassword: boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  onLogin(): void {
    console.log(this.loginRequest);
    this.authService.login(this.loginRequest)
      .subscribe({
        next: user => {
          console.log(user);
          this.authService.initUser(user);
        },
        error: err => {
          console.error(err);
        }
      });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
