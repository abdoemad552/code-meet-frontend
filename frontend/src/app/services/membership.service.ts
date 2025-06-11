import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfoResponse} from '../models/user/user-info-response.dto';
import {RoomInfoResponse} from '../models/room/room-info-response.dto';
import {MembershipRequest} from '../models/membership/membership-request.dto';
import {MembershipInfoResponse} from '../models/membership/membership-info-response.dto';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private url = 'http://localhost:8080/api/membership';

  constructor(private http: HttpClient) {
  }

  getAllUsersOfRoom(roomId: number): Observable<UserInfoResponse[]> {
    return this.http.get<UserInfoResponse[]>(`${this.url}/room/${roomId}/members`);
  }

  getAllRoomsOfUser(userId: number): Observable<RoomInfoResponse[]> {
    return this.http.get<RoomInfoResponse[]>(`${this.url}/user/${userId}/rooms`);
  }

  requestMembership(membershipRequest: MembershipRequest): Observable<MembershipInfoResponse> {
    return this.http.post<MembershipInfoResponse>(`${this.url}/request`, membershipRequest);
  }

  acceptMembership(membershipRequest: MembershipRequest): Observable<HttpResponse<void>> {
    return this.http.patch<HttpResponse<void>>(`${this.url}/accept`, membershipRequest);
  }

  cancelMembership(membershipRequest: MembershipRequest): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(`${this.url}/cancel`, { body: membershipRequest });
  }
}
