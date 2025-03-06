import { ChatMessage } from './chatMessage';

export interface Chat {
  id: string,
  senderName: string,
  senderUsername: string,
  senderProfileImage: string,
  lastMessage: string,
  chatMessages: ChatMessage[],
}
