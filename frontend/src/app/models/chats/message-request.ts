import {PeerMessageRequest} from './peer-message-request';
import {RoomMessageRequest} from './room-message-request';

export type MessageRequest = PeerMessageRequest | RoomMessageRequest;

export type MessageRequests = PeerMessageRequest[] | RoomMessageRequest[];
