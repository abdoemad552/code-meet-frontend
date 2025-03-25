import {RoomInfoResponse} from '../room/room-info-response.dto';
import {MessageInfo} from './message-info';

export interface RoomChatInfo {
  chatId: number,
  roomInfo: RoomInfoResponse,
  messageInfo: MessageInfo
}
