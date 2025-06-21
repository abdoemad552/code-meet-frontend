import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {FriendshipRequest} from "../models/friendship/friendship-request.dto";
import {Observable} from "rxjs";
import {FriendshipInfoResponse} from "../models/friendship/friendship-info-response.dto";

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  private url = 'http://localhost:8080/api/friendship';

  constructor(private http: HttpClient) {
  }

  getFriendship(fromId: number, toId: number): Observable<FriendshipInfoResponse> {
    return this.http.get<any>(`${this.url}`, {
      params: { fromId: fromId, toId: toId }
    });
  }

  getAllFriendships(userId: number): Observable<FriendshipInfoResponse[]> {
    return this.http.get<FriendshipInfoResponse[]>(`${this.url}/${userId}`)
  }

  getAllAcceptedFriendships(userId: number): Observable<FriendshipInfoResponse[]> {
    return this.http.get<FriendshipInfoResponse[]>(`${this.url}/accepted/${userId}`)
  }

  getAllPendingSendFriendships(userId: number): Observable<FriendshipInfoResponse[]> {
    return this.http.get<FriendshipInfoResponse[]>(`${this.url}/pending/${userId}/sent`)
  }

  getAllPendingReceivedFriendships(userId: number): Observable<FriendshipInfoResponse[]> {
    return this.http.get<FriendshipInfoResponse[]>(`${this.url}/pending/${userId}/received`)
  }

  requestFriendship(friendshipRequest: FriendshipRequest): Observable<FriendshipInfoResponse> {
    return this.http.post<any>(`${this.url}/request`, friendshipRequest);
  }

  cancelFriendship(friendshipId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.url}/cancel/${friendshipId}`, { observe: 'response' });
  }

  acceptFriendship(friendshipRequest: FriendshipRequest): Observable<FriendshipInfoResponse> {
    return this.http.patch<any>(`${this.url}/accept`, friendshipRequest);
  }
}
