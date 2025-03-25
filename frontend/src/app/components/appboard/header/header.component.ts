import { NgClass } from '@angular/common';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userInfo: UserInfoResponse;
  isProfileDropdownOpen: boolean = false;
  isNotificationsDropdownOpen: boolean = false;
  @ViewChild('overlay') dropdownOverlay!: ElementRef<HTMLDivElement>;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.userService.userInfo;
  }

  toggleProfileDropdown () : void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    this.isNotificationsDropdownOpen = false;
    this.dropdownOverlay.nativeElement.classList.remove('hidden');
  }

  toggleNotificationsDropdown () : void {
    this.isNotificationsDropdownOpen = !this.isNotificationsDropdownOpen;
    this.isProfileDropdownOpen = false;
    this.dropdownOverlay.nativeElement.classList.remove('hidden');
  }

  closeDropdown() {
    this.isProfileDropdownOpen = false;
    this.isNotificationsDropdownOpen = false;
    this.dropdownOverlay.nativeElement.classList.add('hidden');
  }

  logout(): void {
    this.authService.logout();
  }
}
