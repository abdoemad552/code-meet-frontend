import {Injectable} from '@angular/core';
import {UserInfoResponse} from '../models/user/user-info-response.dto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private readonly url = 'http://localhost:8080/api/user';

  userInfo!: UserInfoResponse;

  constructor(
    private http: HttpClient
  ) {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
  }

  getUserById(userId: number): Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(`${this.url}/${userId}`);
  }

  getUsersByUsername(username: string): Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(`${this.url}`, {
      headers: {'username': username}
    });
  }
}
