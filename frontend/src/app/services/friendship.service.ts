import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FriendshipRequest } from "../models/friendship/friendship-request.dto";
import { Observable } from "rxjs";
import { FriendshipResponse } from "../models/friendship/friendship-response.dto";

@Injectable({
    providedIn:'root'
})
export class FriendshipService{

     private FriendshipsUrl='http://localhost:8080/api/friendship';
        constructor(private httpClient:HttpClient)
        {
            this.httpClient=httpClient;
        }
           
        askFriendshipRequest(friendshipRequest:FriendshipRequest):Observable<number>{
            return this.httpClient.post<number>(`${this.FriendshipsUrl}/request`,friendshipRequest);
        }
        cancelFriendship(friendshipId:number):Observable<boolean>{
            return this.httpClient.delete<boolean>(`${this.FriendshipsUrl}/cancel/${friendshipId}`)
        }
        acceptFriendshipRequest(friendshipId:number):Observable<boolean>{
            return this.httpClient.post<boolean>(`${this.FriendshipsUrl}/accept`,[]);
        }


        getAllFriends(userId:number):Observable<FriendshipResponse[]>{

            return this.httpClient.get<FriendshipResponse[]>(`${this.FriendshipsUrl}/${userId}`)
        }

        getAllPendingFriendships(userId:number):Observable<FriendshipResponse[]>{

            return this.httpClient.get<FriendshipResponse[]>(`${this.FriendshipsUrl}/pending/${userId}`)
        }


}