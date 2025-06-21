import { MembershipStatus } from "../enums/membership-status.enum";
import {UserInfoResponse} from '../user/user-info-response.dto';
import {RoomInfoResponse} from '../room/room-info-response.dto';

export interface MembershipInfoResponse {
  membershipId: number,
  member: UserInfoResponse,
  room: RoomInfoResponse,
  status: MembershipStatus,
  joinedAt: string
}
