import {UserInfoResponse} from '../user/user-info-response.dto';

export interface MeetingInfoResponse {
  meetingId: string;
  title: string;
  description: string;
  creator: UserInfoResponse;
  startsAt: string;
}
