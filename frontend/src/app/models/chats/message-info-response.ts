import {UserInfoResponse} from '../user/user-info-response.dto';

export interface MessageInfoResponse {
  chatId: number,
  sender: UserInfoResponse,
  content: string,
  sentAt: string
}
