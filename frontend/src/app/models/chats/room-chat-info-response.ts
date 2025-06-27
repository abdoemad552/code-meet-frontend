import {RoomInfoResponse} from '../room/room-info-response.dto';
import {RoomMessageResponse} from './room-message-response';

export interface RoomChatInfoResponse {
  chatId: number;
  room: RoomInfoResponse;
  lastSentMessage: RoomMessageResponse;
  currentInput?: string;
}
