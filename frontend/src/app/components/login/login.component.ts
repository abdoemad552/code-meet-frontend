import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormsModule} from '@angular/forms';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest!: any;



  constructor(private authService: AuthenticationService) {
  }

  onLogin(): void {
    console.log(this.loginRequest);
    this.authService.login(this.loginRequest)
      .subscribe({
        next: (userInfo: UserInfoResponse) => {
          console.log(userInfo);
          this.authService.initUser(userInfo);
        },
        error: err => { console.log(err); }
      });
  }
}
