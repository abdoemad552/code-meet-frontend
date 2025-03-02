import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-roomcard',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './roomcard.component.html',
  styleUrl: './roomcard.component.css'
})
export class RoomcardComponent {

}
