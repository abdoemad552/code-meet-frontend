import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/authentication/login-request.dto';
import {Observable, of} from 'rxjs';
import {SignupRequest} from '../models/authentication/signup-request.dto';
import {UserInfoResponse} from '../models/user/user-info-response.dto';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  static URL = 'http://localhost:8080/api/auth';

  authenticated: Observable<boolean> = of(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.http = http;
  }

  login(credentials: LoginRequest) {
    return this.http.post<UserInfoResponse>(
      `${AuthenticationService.URL}/login`, credentials).subscribe(
        response => {
          console.log(response);
          sessionStorage.setItem("userInfo", JSON.stringify(response));
          this.authenticated = of(true);
          this.router.navigateByUrl('/home');
        },
        error => {
          console.log(error);
          alert(error.error.error);
          this.authenticated = of(false);
        }
      );
  }

  signup(userInfo: SignupRequest){
    return this.http.post<UserInfoResponse>(
      `${AuthenticationService.URL}/signup`, userInfo).subscribe(
      response => {
        console.log(response);
        sessionStorage.setItem("userInfo", JSON.stringify(response));
        this.authenticated = of(true);
        this.router.navigateByUrl('/home');
      },
      error => {
        console.log(error);
        alert(error.error.error);
        this.authenticated = of(false);
      }
    );
  }

  logout(): void {
    this.authenticated = of(false);
    sessionStorage.removeItem('userInfo');
    this.router.navigateByUrl('/entry');
  }
}
