import {HttpClient, HttpResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MeetingInfoResponse } from "../models/meeting/meeting-info-response.dto";
import { ScheduleMeetingRequest } from "../models/meeting/schedule-meeting-request.dto";
import { InstantMeetingRequest } from "../models/meeting/instant-meeting-request.dto";
import { ParticipantRequest } from "../models/meeting/participant-request.dto";
import {ParticipantInfoResponse} from '../models/meeting/participant-info-response.dto';

@Injectable({
  providedIn:'root'
})
export class MeetingService {

  private readonly url = 'http://localhost:8080/api/meeting';

  constructor(private http: HttpClient) {
  }

  getMeeting(meetingId: string): Observable<MeetingInfoResponse> {
    return this.http.get<MeetingInfoResponse>(`${this.url}/${meetingId}`);
  }

  getScheduledMeetings(userId: number | string): Observable<MeetingInfoResponse[]> {
    return this.http.get<MeetingInfoResponse[]>(`${this.url}/scheduled/${userId}`);
  }

  getPreviousMeetings(userId: number | string): Observable<MeetingInfoResponse[]> {
    return this.http.get<MeetingInfoResponse[]>(`${this.url}/previous/${userId}`);
  }

  getParticipantOfMeeting(userId: number | string, meetingId: string): Observable<ParticipantInfoResponse> {
    return this.http.get<ParticipantInfoResponse>(`${this.url}/${meetingId}/user/${userId}`);
  }

  getAllParticipantsOfMeeting(meetingId: string): Observable<ParticipantInfoResponse[]> {
    return this.http.get<ParticipantInfoResponse[]>(`${this.url}/${meetingId}/participants`);
  }

  getParticipant(participantId: string): Observable<ParticipantInfoResponse> {
    return this.http.get<ParticipantInfoResponse>(`${this.url}/participant/${participantId}`);
  }

  getAllParticipants(participantsIds: string[]): Observable<ParticipantInfoResponse[]> {
    return this.http.post<ParticipantInfoResponse[]>(`${this.url}/participants`, participantsIds);
  }

  scheduleMeeting(scheduleMeetingRequest: ScheduleMeetingRequest): Observable<MeetingInfoResponse> {
    return this.http.post<MeetingInfoResponse>(
      `${this.url}/schedule`, scheduleMeetingRequest);
  }

  instantMeeting(instantMeetingRequest: InstantMeetingRequest): Observable<MeetingInfoResponse> {
    return this.http.post<MeetingInfoResponse>(
      `${this.url}/instant`, instantMeetingRequest);
  }

  requestJoin(participantRequest: ParticipantRequest): Observable<HttpResponse<ParticipantInfoResponse>> {
    return this.http.post<ParticipantInfoResponse>(`${this.url}/request-join`, participantRequest, {
      observe: 'response'
    });
  }

  acceptJoin(participantRequest: ParticipantRequest): Observable<HttpResponse<ParticipantInfoResponse>> {
    return this.http.post<ParticipantInfoResponse>(`${this.url}/accept-join`, participantRequest, {
      observe: 'response'
    });
  }
}
