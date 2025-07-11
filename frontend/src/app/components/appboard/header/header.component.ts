import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {getOwner} from '../../../shared/environment';
import {dropdownAnimation} from '../../../shared/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, NgIf],
  animations: [dropdownAnimation],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isProfileDropdownOpen: boolean = false;
  isNotificationsDropdownOpen: boolean = false;
  @ViewChild('profileDropdownContainer') profileDropdownContainer: ElementRef;
  @ViewChild('notificationsDropdownContainer') notificationsDropdownContainer: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.isProfileDropdownOpen && !this.profileDropdownContainer.nativeElement.contains(event.target)) {
      this.isProfileDropdownOpen = false;
    }
    if (this.isNotificationsDropdownOpen && !this.notificationsDropdownContainer.nativeElement.contains(event.target)) {
      this.isNotificationsDropdownOpen = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (this.isProfileDropdownOpen || this.isNotificationsDropdownOpen) {
      this.closeDropdown();
      event.preventDefault();
    }
  }

  toggleProfileDropdown () {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  toggleNotificationsDropdown () {
    this.isNotificationsDropdownOpen = !this.isNotificationsDropdownOpen;
  }

  closeDropdown() {
    this.isProfileDropdownOpen = false;
    this.isNotificationsDropdownOpen = false;
  }

  toProfile() {
    this.closeDropdown();
    this.router.navigateByUrl('/profile');
  }

  signOut(): void {
    this.closeDropdown();
    this.authService.signOut();
  }

  get owner() {
    return getOwner();
  }
}
