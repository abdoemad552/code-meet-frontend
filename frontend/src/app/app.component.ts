import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ToastNotificationComponent} from './components/toast-notification/toast-notification.component';
import {WebSocketService} from './services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ToastNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Code Meet';

  constructor(private ws: WebSocketService) {
  }

  ngOnInit() {
    this.ws.connect();
  }
}
