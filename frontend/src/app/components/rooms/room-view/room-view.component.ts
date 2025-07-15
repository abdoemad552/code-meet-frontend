import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {RoomService} from '../../../services/room.service';
import {RoomInfoResponse} from '../../../models/room/room-info-response.dto';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {MembershipService} from '../../../services/membership.service';
import {WebSocketService} from '../../../services/websocket.service';
import {NgForOf, NgIf} from '@angular/common';
import {MemberCardComponent} from './member-card/member-card.component';
import {MembershipInfoResponse} from '../../../models/membership/membership-info-response.dto';

@Component({
  selector: 'app-room-view',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    MemberCardComponent,
    RouterOutlet
  ],
  templateUrl: './room-view.component.html',
  styleUrl: './room-view.component.css'
})
export class RoomViewComponent implements OnInit {
  roomId: number;
  room: RoomInfoResponse;
  memberships: MembershipInfoResponse[];
  requestsShown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private membershipService: MembershipService,
    private websocketService: WebSocketService
  ) {
  }

  private getRoom() {
    this.roomService.getRoomById(this.roomId)
      .subscribe({
        next: room => {
          setTimeout(() => {
            console.log(room);
            this.room = room;
          }, 2000);
        },
        error: err => console.error(err)
      });
  }

  protected getMemberships() {
    this.membershipService.getAllAcceptedMembershipsByRoomId(this.roomId)
      .subscribe({
        next: memberships => {
          setTimeout(() => {
            console.log(memberships);
            this.memberships = memberships;
          }, 4000);
        },
        error: err => console.error(err)
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: params => {
        this.roomId = Number(params.get('id'));
        this.getRoom();
        this.getMemberships();
      },
      error: err => console.error(err)
    });
  }

  leaveRoom() {
    const userInfo: UserInfoResponse
      = JSON.parse(sessionStorage.getItem("userInfo"));
    this.membershipService.cancelMembership({
      userId: userInfo.userId,
      roomId: this.room.roomId
    }).subscribe({
        next: response => {
          console.log(response);
          this.websocketService.unsubscribe(`/room/${this.room.roomId}`);
          this.router.navigateByUrl('/rooms')
            .catch(reason => console.log(reason));
        },
        error: err => console.error(err)
      });
  }

  openChat() {
    this.router.navigateByUrl('/chats');
  }

  showRequests() {
    this.router.navigateByUrl(`/room/${this.roomId}/requests`);
  }

  onRemove(membershipId: number) {
    this.membershipService.cancelMembershipById(membershipId);
  }

  onRoomPictureChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const image = input.files?.[0];
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      this.roomService.updateRoomPicture(this.room.roomId, formData)
        .subscribe({
          next: room => {
            console.log(room);
            this.room = room;
          },
          error: err => console.error(err)
        });
    }
  }

  copyRoomId() {
    navigator.clipboard.writeText(String(this.roomId));
  }
}
