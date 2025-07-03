import {UserInfoResponse} from '../user/user-info-response.dto';
import {MeetingInfoResponse} from './meeting-info-response.dto';

export interface ParticipantInfo {
  participantId: number,
  userInfo: UserInfoResponse,
  meetingInfo: MeetingInfoResponse
}
