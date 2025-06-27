import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {PeerMessageResponse} from '../../../../../models/chats/peer-message-response';
import {RoomMessageResponse} from '../../../../../models/chats/room-message-response';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterLink
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent {
  @Input() message: any;
  @Input() outgoingMessage: boolean;
  @Input() isPrevSame: boolean;
  @Input() isPeerChat: boolean;

  ngOnInit() {
    console.log(this.isPrevSame);
  }

  formatTime(isoString: string): string {
    if (!isoString) isoString = new Date().toISOString();
    const date = new Date(isoString);

    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = date.toLocaleDateString('en-GB'); // British format gives DD/MM/YYYY

    return `${dateString} at ${timeString}`;
  }
}
