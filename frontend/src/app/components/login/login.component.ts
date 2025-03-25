import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormsModule} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest: any = {};

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  onLogin(): void {
    this.authService.login(this.loginRequest)
      .subscribe((response: UserInfoResponse) => {
          console.log(response);
          sessionStorage.setItem("userInfo", JSON.stringify(response));
          this.authService.authenticated = of(true);
          this.router.navigateByUrl('/home');
        }
      );
  }
}
