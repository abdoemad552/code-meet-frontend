import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MeetingInfoResponse } from "../models/meeting/meeting-info-response.dto";
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

  scheduleMeeting(scheduleMeetingRequest: ScheduleMeetingRequest): Observable<MeetingInfoResponse> {
    return this.http.post<MeetingInfoResponse>(
      `${this.url}/schedule`, scheduleMeetingRequest);
  }

  instantMeeting(instantMeetingRequest: InstantMeetingRequest): Observable<MeetingInfoResponse> {
    return this.http.post<MeetingInfoResponse>(
      `${this.url}/instant`, instantMeetingRequest);
  }

  getScheduledMeetings(userId: number): Observable<MeetingInfoResponse[]> {
    return this.http.get<MeetingInfoResponse[]>(`${this.url}/scheduled/${userId}`);
  }

  getPreviousMeetings(userId: number): Observable<MeetingInfoResponse[]> {
    return this.http.get<MeetingInfoResponse[]>(`${this.url}/previous/${userId}`);
  }

  getParticipantOfMeeting(meetingId: string, userId: number): Observable<ParticipantInfo> {
    return this.http.get<ParticipantInfo>(`${this.url}/${meetingId}/user/${userId}`);
  }
}
