import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import data from '../../../../../public/chats.json';
import {Chat} from '../../../models/chats/chat';
import {ChatInfoResponse} from '../../../models/chats/chat-info-response';
import {MessageInfoResponse} from '../../../models/chats/message-info-response';
import {ChatService} from '../../../services/chat.service';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent {
  @Input() chat: ChatInfoResponse;
  @Input() messages: MessageInfoResponse[];
  @Output() hideChatbox = new EventEmitter<void>();
  owner: UserInfoResponse;

  chats: Chat[] = data;
  isPrevSame!: boolean[];
  @ViewChild('messageContent') messageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('messagesContainer') private messagesBox!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  get chatId() {
    return this.chat.chatId;
  }

  get chatPictureUrl() {
    if (this.chat.isPeerChat) {
      return this.chat.other.profilePictureUrl;
    } else {
      return this.chat.other.roomPictureUrl;
    }
  }

  get chatName() {
    if (this.chat.isPeerChat) {
      return this.chat.other.firstName + ' ' + this.chat.other.lastName;
    } else {
      return this.chat.other.roomName;
    }
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  sendMessage(): void {
    const content = this.messageInput.nativeElement.value.trim();
    if (content) {
      this.messages.push({
        content: content,
        sender: this.owner,
        chatId: this.chat.chatId,
        sentAt: new Date().toISOString()
      });
      this.populateIsPrevSame();
      this.messageInput.nativeElement.value = '';
    }
  }

  populateIsPrevSame(): void {
    this.isPrevSame = this.messages.map((message, index) => {
      if (index === 0) return false; // First, a message always shows name
      const prevSender = this.messages[index - 1].sender;
      return message.sender.userId === prevSender.userId;
    });
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const element = this.messagesBox.nativeElement;
      element.scrollTop = element.scrollHeight;
    }, 0);
  }

  onHideChatbox() {
    this.hideChatbox.emit();
  }
}
