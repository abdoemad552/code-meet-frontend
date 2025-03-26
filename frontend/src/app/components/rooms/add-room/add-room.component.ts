import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RoomCreationRequest} from '../../../models/room/room-creation-request.dto';
import {UserService} from '../../../services/user.service';
import {RoomService} from '../../../services/room.service';
import {Router} from '@angular/router';
import {RoomInfoResponse} from '../../../models/room/room-info-response.dto';

@Component({
  selector: 'app-add-room',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  @Input() isModalOpen = false;

  roomName!: string;
  roomDescription!: string;

  roomData!: RoomCreationRequest;

  userId!: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private roomService: RoomService
  ) {
    this.userId = this.userService.userInfo.userId;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  onSubmit() {
    this.roomData = {
      name: this.roomName,
      description: this.roomDescription,
      creatorId: this.userId,
      roomPicture: ''
    };

    this.roomService.createRoom(this.roomData)
      .subscribe({
        next: (roomInfo: RoomInfoResponse) => {
          this.router.navigateByUrl(`/room/${roomInfo.roomId}`)
            .catch(reason => console.log(reason));
        },
        error: err => console.log(err)
      });

    this.closeModal();
  }

  private resetForm() {
    this.roomData = {
      name: '',
      description: '',
      creatorId: this.userId,
    };
  }
}
