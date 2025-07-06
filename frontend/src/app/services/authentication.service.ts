import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/authentication/login-request.dto';
import {Observable} from 'rxjs';
import {SignupRequest} from '../models/authentication/signup-request.dto';
import {UserInfoResponse} from '../models/user/user-info-response.dto';
import {Router} from '@angular/router';
import {WebSocketService} from './websocket.service';
import {clearOwner, setOwner} from '../shared/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'http://localhost:8080/api/auth';

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

  signOut(): void {
    clearOwner();
    this.wsService.disconnect();
    this.router.navigateByUrl('/entry');
  }

  initUser(userInfo: UserInfoResponse): void {
    setOwner(userInfo);
    this.wsService.connect();
    this.router.navigateByUrl('/home')
      .catch(err => console.error(err));
  }
}
