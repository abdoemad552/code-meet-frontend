import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  onLogin(event: any): void {
    this.authService.login({
      username: this.username,
      password: this.password
    });
  }
}
