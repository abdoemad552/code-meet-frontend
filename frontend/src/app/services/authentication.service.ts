import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/authentication/login-request.dto';
import {Observable, of} from 'rxjs';
import {SignupRequest} from '../models/authentication/signup-request.dto';
import {UserInfoResponse} from '../models/user/user-info-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authURL = 'http://localhost:8080/api/auth';

  authenticated: Observable<boolean> = of(false);

  constructor(private http: HttpClient) {
  }

  login(credentials: LoginRequest): Observable<UserInfoResponse> {
    return this.http.post<UserInfoResponse>(`${this.authURL}/login`, credentials);
  }

  signup(userInfo: SignupRequest): Observable<UserInfoResponse> {
    return this.http.post<UserInfoResponse>(`${this.authURL}/signup`, userInfo);
  }

  logout(): void {
    this.authenticated = of(false);
    sessionStorage.removeItem('userInfo');
  }
}
