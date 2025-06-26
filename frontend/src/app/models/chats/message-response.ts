import {PeerMessageResponse} from './peer-message-response';
import {RoomMessageResponse} from './room-message-response';

export type MessageResponse = PeerMessageResponse | RoomMessageResponse;

export type MessageResponses = PeerMessageResponse[] | RoomMessageResponse[];
