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

  private url = 'http://localhost:8080/api/room';

  constructor(private http: HttpClient) {
  }

  getRoomById(roomId: number): Observable<RoomInfoResponse> {
    return this.http.get<RoomInfoResponse>(`${this.url}/${roomId}`);
  }

  getAllRoomsByCreator(creatorId: number): Observable<RoomInfoResponse[]> {
    return this.http.get<RoomInfoResponse[]>(`${this.url}/all/${creatorId}`);
  }

  searchForRooms(query: string): Observable<RoomInfoResponse[]> {
    return this.http.get<RoomInfoResponse[]>(`${this.url}/search`, {
      params: { query: query }
    });
  }

  createRoom(roomCreationRequest: RoomCreationRequest): Observable<RoomInfoResponse> {
    return this.http.post<RoomInfoResponse>(
      `${this.url}/create`, roomCreationRequest);
  }

  updateRoom(roomUpdateRequest: RoomUpdateRequest): Observable<RoomInfoResponse> {
    return this.http.put<RoomInfoResponse>(
      `${this.url}/update`, roomUpdateRequest);
  }

  updateRoomPicture(roomId: number, formData: FormData): Observable<RoomInfoResponse> {
    return this.http.post<RoomInfoResponse>(`${this.url}/update/${roomId}/roomPicture`, formData);
  }

  //TODO: Add the ability to delete an existing image...
}
