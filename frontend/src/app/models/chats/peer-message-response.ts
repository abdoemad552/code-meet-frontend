import {UserInfoResponse} from '../user/user-info-response.dto';

export interface PeerMessageResponse {
  messageId: number;
  chatId: number;
  peerId: number;
  sender: UserInfoResponse;
  content: string;
  sentAt: string;
}
