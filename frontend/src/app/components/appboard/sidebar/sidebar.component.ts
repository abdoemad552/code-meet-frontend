import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isSidebarMinimized = false;

  toggleSidebarMinimization() {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
}
