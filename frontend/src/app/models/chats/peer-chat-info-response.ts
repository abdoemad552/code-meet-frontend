import {MessageInfoResponse} from './message-info-response';
import {UserInfoResponse} from '../user/user-info-response.dto';

export interface PeerChatInfoResponse {
  chatId: number;
  peer: UserInfoResponse;
  lastSentMessage: MessageInfoResponse;
}
