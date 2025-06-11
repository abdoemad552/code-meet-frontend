import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
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

  getAllMembershipsByRoomId(roomId: number): Observable<MembershipInfoResponse[]> {
    return this.http.get<MembershipInfoResponse[]>(`${this.url}/room/${roomId}/memberships`);
  }

  getAllAcceptedMembershipsByRoomId(roomId: number): Observable<MembershipInfoResponse[]> {
    return this.http.get<MembershipInfoResponse[]>(`${this.url}/room/${roomId}/memberships/accepted`);
  }

  getAllPendingMembershipsByRoomId(roomId: number): Observable<MembershipInfoResponse[]> {
    return this.http.get<MembershipInfoResponse[]>(`${this.url}/room/${roomId}/memberships/pending`);
  }

  getAllRoomsByUserId(userId: number): Observable<RoomInfoResponse[]> {
    return this.http.get<RoomInfoResponse[]>(`${this.url}/user/${userId}/rooms`);
  }

  requestMembership(membershipRequest: MembershipRequest): Observable<MembershipInfoResponse> {
    return this.http.post<MembershipInfoResponse>(`${this.url}/request`, membershipRequest);
  }

  acceptMembership(membershipRequest: MembershipRequest): Observable<HttpResponse<void>> {
    return this.http.patch<void>(`${this.url}/accept`, membershipRequest, {
      observe: 'response'
    });
  }

  acceptMembershipById(membershipId: number): Observable<HttpResponse<void>> {
    return this.http.patch<void>(`${this.url}/accept/${membershipId}`, null, {
      observe: 'response'
    });
  }

  cancelMembership(membershipRequest: MembershipRequest): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.url}/cancel`, {
      body: membershipRequest,
      observe: 'response'
    });
  }

  cancelMembershipById(membershipId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.url}/cancel/${membershipId}`, {
      observe: 'response'
    });
  }
}
