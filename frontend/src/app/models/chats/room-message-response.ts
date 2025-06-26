import {UserInfoResponse} from '../user/user-info-response.dto';

export class RoomMessageResponse {
  messageId: number;
  chatId: number;
  roomId: number;
  sender: UserInfoResponse;
  content: string;
}
