import {UserInfoResponse} from '../user/user-info-response.dto';
import {MeetingResponse} from './meeting-response.dto';

export interface ParticipantInfo {
  participantId: number,
  userInfo: UserInfoResponse,
  meetingInfo: MeetingResponse
}
