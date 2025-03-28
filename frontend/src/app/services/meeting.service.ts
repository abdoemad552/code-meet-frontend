import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MeetingResponse } from "../models/meeting/meeting-response.dto";
import { ScheduledMeeting } from "../models/meeting/scheduled-meeting.dto";
import { InstantMeetingRequest } from "../models/meeting/instant-meeting-request.dto";
import { ParticipantRequest } from "../models/meeting/participant-request.dto";

@Injectable({
  providedIn:'root'
})
export class MeetingService {

  private MeetingsUrl = 'http://localhost:8080/api/meeting';

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getPreviousMeetings(userId: number): Observable<MeetingResponse[]> {
    return this.httpClient.get<MeetingResponse[]>(
      `${this.MeetingsUrl}/previous/${userId}`);
  }

  getScheduledMeetings(userId: number): Observable<MeetingResponse[]> {
    return this.httpClient.get<MeetingResponse[]>(
      `${this.MeetingsUrl}/scheduled/${userId}`);
  }

  scheduleMeeting(scheduleMeetingRequest: ScheduledMeeting): Observable<MeetingResponse> {
    return this.httpClient.post<MeetingResponse>(
      `${this.MeetingsUrl}/schedule`,scheduleMeetingRequest);
  }

  createInstantMeeting(instantMeetingRequest: InstantMeetingRequest): Observable<MeetingResponse> {
    return this.httpClient.post<MeetingResponse>(
      `${this.MeetingsUrl}/instant`,instantMeetingRequest);
  }

  addParticipantToMeeting(participantRequest: ParticipantRequest): Observable<MeetingResponse> {
    return this.httpClient.post<MeetingResponse>(
      `${this.MeetingsUrl}/participant`,participantRequest);
  }

  removeParticipantFromMeeting(participantRequest: ParticipantRequest): Observable<any> {
    return this.httpClient.delete(`${this.MeetingsUrl}/participant`,{body:participantRequest})
  }
}
