import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/authentication/login-request.dto';
import {BehaviorSubject, Observable} from 'rxjs';
import {SignupRequest} from '../models/authentication/signup-request.dto';
import {UserInfoResponse} from '../models/user/user-info-response.dto';
import {Router} from '@angular/router';
import {WebSocketService} from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'http://localhost:8080/api/auth';

  private authenticated = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticated.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private wsService: WebSocketService,
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
      this.authenticated.next(false);
      sessionStorage.removeItem('userInfo');
      this.wsService.disconnect();
      this.router.navigateByUrl('/entry')
        .catch(reason => console.log(reason));
    }
  }

  initUser(userInfo: UserInfoResponse): void {
    this.authenticated.next(true);
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    this.wsService.connect();
    this.router.navigateByUrl('/home')
      .catch(reason => console.log(reason));
  }
}
