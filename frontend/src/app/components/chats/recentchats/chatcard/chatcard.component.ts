import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-chatcard',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './chatcard.component.html',
  styleUrl: './chatcard.component.css'
})
export class ChatcardComponent {
  @Input() route: string = '';

}
