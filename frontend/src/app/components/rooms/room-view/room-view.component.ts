import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RoomService} from '../../../services/room.service';
import {RoomInfoResponse} from '../../../models/room/room-info-response.dto';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {UserService} from '../../../services/user.service';
import {switchMap} from 'rxjs';
import {MembershipService} from '../../../services/membership.service';
import {WebSocketService} from '../../../services/websocket.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-room-view',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './room-view.component.html',
  styleUrl: './room-view.component.css'
})
export class RoomViewComponent implements OnInit {
  room: RoomInfoResponse;
  creator: UserInfoResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private userService: UserService,
    private membershipService: MembershipService,
    private websocketService: WebSocketService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const roomId = Number(params.get('id'));
        return this.roomService.getRoomById(roomId).pipe(
          switchMap(room => {
            setTimeout(() => this.room = room, 500); // Update room first
            return this.userService.getUserById(room.creatorId);
          })
        );
      })
    ).subscribe({
      next: creator => setTimeout(() => this.creator = creator, 500),
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
}
