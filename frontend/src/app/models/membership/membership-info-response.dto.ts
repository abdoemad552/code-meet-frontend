import { MembershipStatus } from "../enums/MembershipStatus.enum";

export interface MembershipInfoResponse{
  membershipId: number,
  status: MembershipStatus
}
