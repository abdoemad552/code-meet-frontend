import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgIf, TitleCasePipe} from '@angular/common';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {BoardDataService} from '../../services/board-data.service';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ProfileEditComponent,
    TitleCasePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userInfo!: UserInfoResponse;
  userName!: string | null;
  isOwnProfile: boolean = false;
  areFriends : boolean = false;
  editProfile: boolean = false;


  constructor(protected router: Router, private dataService: BoardDataService, private userService: UserService) {
    this.dataService.minimizeSidebar();
    this.dataService.removeMainContentPadding();

    this.userInfo = this.userService.userInfo;
  }

  ngOnInit() {
    if (this.router.url === '/profile')
      this.isOwnProfile = true;
  }

  ngOnDestroy() {
    this.dataService.maximizeSidebar();
    this.dataService.addMainContentPadding();
  }

  addFriend() {
    this.areFriends = true;
  }

  removeFriend() {
    this.areFriends = false;
  }

  enableProfileEdit() {
    this.editProfile = true;
  }
}
