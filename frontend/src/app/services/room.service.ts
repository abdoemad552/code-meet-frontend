import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RoomInfoResponse } from "../models/room/room-info-response.dto";
import { RoomCreationRequest } from "../models/room/room-creation-request.dto";
import { RoomUpdateRequest } from "../models/room/room-update-request.dto";

@Injectable({
    providedIn:'root'
})
export class RoomService{

    private RoomsUrl='http://localhost:8080/api/room';
    constructor(private httpClient:HttpClient)
    {

    }

    getRoomById(roomId:number):Observable<RoomInfoResponse>{
        return this.httpClient.get<RoomInfoResponse>(`${this.RoomsUrl}/${roomId}`);
    }
    getAllRoomsByCreator(creatorId:number):Observable<RoomInfoResponse[]>{

        return this.httpClient.get<RoomInfoResponse[]>(`${this.RoomsUrl}/all/${creatorId}`);
    }
    createRoom(roomCreationRequest: RoomCreationRequest):Observable<RoomInfoResponse>{
        return this.httpClient.post<RoomInfoResponse>(`${this.RoomsUrl}/create`,roomCreationRequest);
    }
    updateRoom(roomUpdateRequest:RoomUpdateRequest):Observable<RoomInfoResponse>{
        return this.httpClient.put<RoomInfoResponse>(`${this.RoomsUrl}/update`,roomUpdateRequest);
    }

}