import {UserInfoResponse} from '../user/user-info-response.dto';
import {PeerMessageResponse} from './peer-message-response';

export interface PeerChatInfoResponse {
  chatId: number;
  peer: UserInfoResponse;
  lastSentMessage: PeerMessageResponse;
  currentInput?: string;
}
