import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RoomService} from '../../../services/room.service';
import {RoomInfoResponse} from '../../../models/room/room-info-response.dto';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {MembershipService} from '../../../services/membership.service';
import {WebSocketService} from '../../../services/websocket.service';
import {NgForOf, NgIf} from '@angular/common';
import {MemberCardComponent} from './member-card/member-card.component';
import {MembershipInfoResponse} from '../../../models/membership/membership-info-response.dto';
import {MembershipRequestsComponent} from './membership-requests/membership-requests.component';

@Component({
  selector: 'app-room-view',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    MemberCardComponent,
    MembershipRequestsComponent
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

  showRequests() {
    this.requestsShown = true;
  }

  hideRequests() {
    this.requestsShown = false;
  }

  onRemove(membershipId: number) {
    this.membershipService.cancelMembershipById(membershipId);
  }
}
