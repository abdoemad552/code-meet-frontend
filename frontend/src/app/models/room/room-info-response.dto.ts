import {UserInfoResponse} from '../user/user-info-response.dto';

export interface RoomInfoResponse {
  roomId: number;
  roomName: string;
  roomDescription: string;
  creator: UserInfoResponse;
  createdAt: string;
  roomPictureUrl: string;
}
