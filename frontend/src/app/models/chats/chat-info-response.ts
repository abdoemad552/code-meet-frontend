import {MessageInfoResponse} from './message-info-response';

export interface ChatInfoResponse {
  chatId: number;
  other: any;
  lastSentMessage?: MessageInfoResponse;
  isPeerChat: boolean;
}
