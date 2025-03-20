import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest: any = {};

  constructor(private authService: AuthenticationService) {
  }

  onLogin(): void {
    this.authService.login(this.loginRequest);
  }
}
