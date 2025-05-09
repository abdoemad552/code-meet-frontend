import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MeetingResponse } from "../models/meeting/meeting-response.dto";
import { ScheduleMeetingRequest } from "../models/meeting/schedule-meeting-request.dto";
import { InstantMeetingRequest } from "../models/meeting/instant-meeting-request.dto";
import { ParticipantRequest } from "../models/meeting/participant-request.dto";
import {ParticipantInfo} from '../models/meeting/participant-info.dto';

@Injectable({
  providedIn:'root'
})
export class MeetingService {

  private readonly url = 'http://localhost:8080/api/meeting';

  constructor(private http: HttpClient) {
  }

  joinMeeting(participantRequest: ParticipantRequest): Observable<ParticipantInfo> {
    return this.http.post<ParticipantInfo>(`${this.url}/join`, participantRequest);
  }

  scheduleMeeting(scheduleMeetingRequest: ScheduleMeetingRequest): Observable<MeetingResponse> {
    return this.http.post<MeetingResponse>(
      `${this.url}/schedule`, scheduleMeetingRequest);
  }

  instantMeeting(instantMeetingRequest: InstantMeetingRequest): Observable<MeetingResponse> {
    return this.http.post<MeetingResponse>(
      `${this.url}/instant`, instantMeetingRequest);
  }

  getScheduledMeetings(userId: number): Observable<MeetingResponse[]> {
    return this.http.get<MeetingResponse[]>(`${this.url}/scheduled/${userId}`);
  }

  getPreviousMeetings(userId: number): Observable<MeetingResponse[]> {
    return this.http.get<MeetingResponse[]>(`${this.url}/previous/${userId}`);
  }

  getParticipantOfMeeting(meetingId: number, userId: number): Observable<ParticipantInfo> {
    return this.http.get<ParticipantInfo>(`${this.url}/${meetingId}/user/${userId}`);
  }
}
