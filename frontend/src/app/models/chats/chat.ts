import { MessageInfo } from './message-info';

export interface Chat {
  id: string,
  senderName: string,
  senderUsername: string,
  senderProfileImage: string,
  lastMessage: string,
  chatMessages: MessageInfo[],
}
