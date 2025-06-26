import {UserInfoResponse} from '../user/user-info-response.dto';
import {PeerMessageResponse} from './peer-message-response';

export class PeerChatInfoResponse {
  chatId: number;
  peer: UserInfoResponse;
  lastSentMessage: PeerMessageResponse;
}
