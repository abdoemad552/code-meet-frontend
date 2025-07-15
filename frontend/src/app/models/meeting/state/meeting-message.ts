export interface ChatMessage {
  sender: {
    id: string,
    firstName?: string,
    lastName?: string,
    username?: string,
    profilePictureUrl?: string
  },
  content: string,
  sentAt: string
}
