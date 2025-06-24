import {RoomInfoResponse} from '../room/room-info-response.dto';
import {MessageInfoResponse} from './message-info-response';

export interface RoomChatInfoResponse {
  chatId: number;
  room: RoomInfoResponse;
  lastSentMessage: MessageInfoResponse;
}
