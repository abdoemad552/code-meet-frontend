import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/login/login-request.dto';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SignupRequest} from '../models/login/signup-request.dto';
import {UserInfoResponse} from '../models/user/user-info-response.dto';
import {Router} from '@angular/router';
import {routes} from '../app.routes';

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
          alert(error.error.error);
          this.authenticated = of(false);
        }
      );
  }

  signup(signupRequest: SignupRequest): Observable<UserInfoResponse> {
    return this.http.post<UserInfoResponse>(
      `${AuthenticationService.URL}/signup`, signupRequest);
  }

  logout(): void {
    this.authenticated = of(false);
    sessionStorage.removeItem('userInfo');
    this.router.navigateByUrl('/entry');
  }
}
