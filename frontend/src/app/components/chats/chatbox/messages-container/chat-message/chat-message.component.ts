import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {formatDateTime} from '../../../../../shared/utils';

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

  protected readonly formatDateTime = formatDateTime;
}
