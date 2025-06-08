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

  requestFriendship(friendshipRequest: FriendshipRequest): Observable<number> {
    return this.http.post<number>(`${this.url}/request`, friendshipRequest);
  }

  cancelFriendship(friendshipId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.url}/cancel/${friendshipId}`, { observe: 'response' });
  }

  acceptFriendship(friendshipId: number): Observable<HttpResponse<void>> {
    return this.http.patch<void>(`${this.url}/accept/${friendshipId}`, null, { observe: 'response' });
  }
}
