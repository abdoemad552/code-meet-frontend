import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  message = '';

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    // Subscribe to WebSocket messages and update 'message' when new data arrives
    this.webSocketService.message$.subscribe(msg => {
      this.message = msg;
    });
  }

  connectWebSocket() {
    this.webSocketService.connect();
  }

  sendMessage() {
    this.webSocketService.sendMessage(this.message);
   
  }

  disconnectWebSocket() {
    this.webSocketService.disconnect();
  }
}
