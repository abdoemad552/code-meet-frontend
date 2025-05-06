import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {UserInfoResponse} from '../../../../models/user/user-info-response.dto';
import {FormsModule} from '@angular/forms';

interface Message {
  senderId: number;
  senderName: string;
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-content',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './meeting-content.component.html',
  standalone: true,
  styleUrl: './meeting-content.component.css'
})
export class MeetingContentComponent {
  @Input() messages: Message[] = [];
  @Input() participants: UserInfoResponse[];
  @Input() volumeLevels: { [userId: number]: number } = {};
  @Input() isCamEnabled: boolean;
  @Input() sidebarContent: 'chat' | 'participants' | 'hidden';
  @Output() hideSidebar = new EventEmitter<void>();
  @Output() messageSent = new EventEmitter<string>();

  inputMessage: string = '';

  isSpeaking(userId: number): boolean {
    return this.volumeLevels[userId] >= 50;
  }

  onHideSidebar() {
    this.hideSidebar.emit();
  }

  sendMessage() {
    if (this.inputMessage.trim()) {
      const userInfo: UserInfoResponse = JSON.parse(sessionStorage.getItem("userInfo"));
      const newMessage = {
        senderId: userInfo.userId,
        senderName: `${userInfo.firstName} ${userInfo.lastName}`,
        text: this.inputMessage.trim(),
        timestamp: new Date()
      };
      this.messageSent.emit(JSON.stringify(newMessage));
      this.inputMessage = '';
    }
  }

  get sortedParticipants() {
    return this.participants.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;

      return a.username.toLowerCase().localeCompare(b.username.toLowerCase());
    });
  }
}
