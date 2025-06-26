import {RoomInfoResponse} from '../room/room-info-response.dto';
import {RoomMessageResponse} from './room-message-response';

export class RoomChatInfoResponse {
  chatId: number;
  room: RoomInfoResponse;
  lastSentMessage: RoomMessageResponse;
}
