import {PeerChatInfoResponse} from './peer-chat-info-response';
import {RoomChatInfoResponse} from './room-chat-info-response';

export type ChatInfoResponse = PeerChatInfoResponse | RoomChatInfoResponse;

export type ChatInfoResponses = PeerChatInfoResponse[] | RoomChatInfoResponse[];
