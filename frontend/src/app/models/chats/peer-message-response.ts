import {UserInfoResponse} from '../user/user-info-response.dto';

export class PeerMessageResponse {
  messageId: number;
  chatId: number;
  peerId: number;
  sender: UserInfoResponse;
  content: string;
}
