import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/authentication/login-request.dto';
import {Observable, of} from 'rxjs';
import {SignupRequest} from '../models/authentication/signup-request.dto';
import {UserInfoResponse} from '../models/user/user-info-response.dto';
import {Router} from '@angular/router';
import {WebSocketService} from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'http://localhost:8080/api/auth';

  authenticated: Observable<boolean> = of(false);

  constructor(
    private router: Router,
    private http: HttpClient,
    private wsService: WebSocketService
  ) {
  }

  login(credentials: LoginRequest): Observable<UserInfoResponse> {
    return this.http.post<UserInfoResponse>(`${this.url}/login`, credentials);
  }

  signup(userInfo: SignupRequest): Observable<UserInfoResponse> {
    return this.http.post<UserInfoResponse>(`${this.url}/signup`, userInfo);
  }

  logout(): void {
    if (sessionStorage.getItem('userInfo')) {
      this.authenticated = of(false);
      sessionStorage.removeItem('userInfo');
      this.router.navigateByUrl('/entry')
        .catch(reason => console.log(reason));
      this.wsService.disconnect();
    }
  }

  initUser(userInfo: UserInfoResponse): void {
    this.authenticated = of(true);
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    this.router.navigateByUrl('/home')
      .catch(reason => console.log(reason));
    this.wsService.connect();
  }
}
