import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {BoardDataService} from '../../services/states/board-data.service';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ProfileEditComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: UserInfoResponse;
  isOwner: boolean;
  areFriends : boolean = false;
  editProfileShown: boolean = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: BoardDataService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: params => {
        this.user = null;
        const owner = JSON.parse(sessionStorage.getItem("userInfo"));
        const username = params.get("username");
        if (username === owner.username) {
          setTimeout(() => {
            this.isOwner = true;
            this.user = owner;
          }, 2000);
        } else {
          this.userService.getUserByUsername(username)
            .subscribe({
              next: user => {
                setTimeout(() => {
                  this.isOwner = false;
                  this.user = user;
                }, 2000);
              },
              error: err => console.error(err)
            });
        }
      },
      error: err => console.error(err)
    });
  }

  ngOnDestroy() {
    this.dataService.addMainContentPadding();
  }

  addFriend() {
    this.areFriends = true;
  }

  removeFriend() {
    this.areFriends = false;
  }

  showEditProfile() {
    this.editProfileShown = true;
  }

  hideEditProfile() {
    this.editProfileShown = false;
  }

  signOut() {
    this.authService.signOut();
  }
}
