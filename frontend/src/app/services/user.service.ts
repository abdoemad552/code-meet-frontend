import {Injectable} from '@angular/core';
import {UserInfoResponse} from '../models/user/user-info-response.dto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private readonly url = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getUserById(userId: number): Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(`${this.url}/${userId}`);
  }

  getUserByUsername(username: string): Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(`${this.url}`, {
      params: { username: username }
    });
  }

  searchForUsers(query: string, uno: boolean): Observable<UserInfoResponse[]> {
    return this.http.get<UserInfoResponse[]>(`${this.url}/search`, {
      params: { query: query, uno: uno }
    });
  }
}
