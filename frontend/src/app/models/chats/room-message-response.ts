import {UserInfoResponse} from '../user/user-info-response.dto';

export interface RoomMessageResponse {
  messageId: number;
  chatId: number;
  roomId: number;
  sender: UserInfoResponse;
  content: string;
  sentAt: string;
}
