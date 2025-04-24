import {HttpClient} from "@angular/common/http";
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

  askFriendshipRequest(friendshipRequest: FriendshipRequest): Observable<number> {
    return this.http.post<number>(`${this.url}/request`, friendshipRequest);
  }

  cancelFriendship(friendshipId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.http}/cancel/${friendshipId}`)
  }

  acceptFriendshipRequest(friendshipId: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.url}/accept/${friendshipId}`, null);
  }
}
