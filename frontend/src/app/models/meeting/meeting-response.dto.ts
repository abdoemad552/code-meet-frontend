import {UserInfoResponse} from '../user/user-info-response.dto';

export interface MeetingResponse {
  meetingId: number;
  title: string;
  description: string;
  creatorInfo: UserInfoResponse;
  startsAt: string;
}
