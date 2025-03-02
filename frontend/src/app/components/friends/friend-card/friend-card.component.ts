import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent {
  @Input() imageUrl: string = 'https://placehold.co/128'; // Default placeholder
  @Input() name: string = 'John Doe';
  @Input() userName: string = 'johndoe123';
  @Output() messageClicked = new EventEmitter<void>();

  onMessageClick() {
    console.log('Clicked!');
  }
}
