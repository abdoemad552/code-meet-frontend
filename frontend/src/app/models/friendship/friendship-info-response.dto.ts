import {FriendshipStatus} from '../enums/friendship-status.enum';
import {UserInfoResponse} from '../user/user-info-response.dto';

export interface FriendshipInfoResponse {
  friendshipId: number;
  other: UserInfoResponse,
  isSent: boolean,
  status: FriendshipStatus
}

export function noFriendship(other: UserInfoResponse) {
  return {
    friendshipId: null,
    other: other,
    isSent: null,
    status: FriendshipStatus.NO_FRIENDSHIP
  };
}
