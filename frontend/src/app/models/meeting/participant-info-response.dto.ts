import {UserInfoResponse} from '../user/user-info-response.dto';

export interface ParticipantInfoResponse {
  participantId: string;
  meetingId: string;
  user: UserInfoResponse;
}
