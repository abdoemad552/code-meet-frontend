import {Component, EventEmitter, Output, HostListener} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoomCreationRequest} from '../../../models/room/room-creation-request.dto';
import {RoomService} from '../../../services/room.service';
import {Router} from '@angular/router';
import {RoomInfoResponse} from '../../../models/room/room-info-response.dto';
import {WebSocketService} from '../../../services/websocket.service';

@Component({
  selector: 'app-create-room',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  @Output() hideModal = new EventEmitter<void>();

  creationRequest: RoomCreationRequest = {
    name: '',
    description: '',
    creatorId: JSON.parse(sessionStorage.getItem("userInfo")).userId
  };

  constructor(
    private router: Router,
    private roomService: RoomService,
    private websocketService: WebSocketService
  ) {
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.onHideModal()
    event.preventDefault();
  }

  onHideModal() {
    this.hideModal.emit();
  }

  onSubmit() {
    this.roomService.createRoom(this.creationRequest)
      .subscribe({
        next: (room: RoomInfoResponse) => {
          console.log(room);
          this.websocketService.subscribe(`/room/${room.roomId}`);
          this.router.navigateByUrl(`/room/${room.roomId}`)
            .catch(reason => console.log(reason));
        },
        error: err => console.error(err)
      });
  }
}
