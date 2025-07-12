import {UserInfoResponse} from '../user/user-info-response.dto';
import {MeetingStatus} from '../enums/meeting-status.enum';

export interface MeetingInfoResponse {
  meetingId: string;
  title: string;
  description: string;
  creator: UserInfoResponse;
  startsAt: string;
  status: MeetingStatus;
}
