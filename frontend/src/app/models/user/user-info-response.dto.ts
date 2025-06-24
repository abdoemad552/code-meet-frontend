export interface UserInfoResponse {
  userId: number,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  phoneNumber: string,
  profilePictureUrl: string,
  gender: string,
  bio?: string,
}
