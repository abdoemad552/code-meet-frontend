import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {FriendshipService} from '../../services/friendship.service';
import {FriendshipInfoResponse, noFriendship} from '../../models/friendship/friendship-info-response.dto';
import {getOwner} from '../../shared/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgClass,
    RouterOutlet
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: UserInfoResponse;
  friendship: FriendshipInfoResponse;
  isOwner: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService,
    private friendshipService: FriendshipService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: params => {
        this.user = null;
        const username = params.get("username");

        if (!username) {
          this.router.navigateByUrl(`/profile/${getOwner().username}`, {
            replaceUrl: true
          });
        } else if (username === getOwner().username) {
          this.isOwner = true;
          setTimeout(() => {
            this.user = getOwner();
          }, 2000);
        } else {
          this.isOwner = false;
          this.userService.getUserByUsername(username)
            .subscribe({
              next: user => {
                setTimeout(() => {
                  this.user = user;
                  this.friendshipService.getFriendship(getOwner().userId, user.userId)
                    .subscribe({
                      next: friendship => {
                        console.log(friendship);
                        setTimeout(() => {
                          this.friendship = friendship;
                        }, 1000);
                      },
                      error: err => {
                        console.error(err);
                        this.friendship = noFriendship(user);
                      }
                    });
                }, 2000);
              },
              error: err => console.error(err)
            });
        }
      },
      error: err => console.error(err)
    });
  }

  showEditProfile() {
    this.router.navigateByUrl(`/profile/${getOwner().username}/edit`);
  }

  signOut() {
    this.authService.signOut();
  }

  requestFriendship() {
    this.friendshipService.requestFriendship({
      fromId: getOwner().userId,
      toId: this.user.userId
    }).subscribe({
      next: friendship => {
        setTimeout(() => {
          this.friendship = friendship;
        }, 2000);
      },
      error: err => console.error(err)
    });
  }

  acceptFriendship() {
    this.friendshipService.acceptFriendship({
      fromId: getOwner().userId,
      toId: this.user.userId
    }).subscribe({
      next: friendship => {
        setTimeout(() => {
          this.friendship = friendship;
        }, 2000);
      },
      error: err => console.error(err)
    });
  }

  cancelFriendship() {
    this.friendshipService.cancelFriendship(this.friendship.friendshipId)
      .subscribe({
        next: response => {
          console.log(response);
          this.friendship = noFriendship(this.user);
        },
        error: err => console.error(err)
      });
  }
}
