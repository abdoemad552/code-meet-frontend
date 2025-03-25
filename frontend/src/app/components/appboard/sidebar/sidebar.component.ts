import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import {NgClass} from '@angular/common';
import {BoardDataService} from '../../../services/board-data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavigationComponent, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isSidebarMinimized = false;

  constructor(private dataService: BoardDataService) {
  }

  ngOnInit() {
    this.dataService.isSidebarMinimized$.subscribe(isSidebarMinimized => {
      this.isSidebarMinimized = isSidebarMinimized;
    });
  }

  toggleSidebarMinimization() {
    if (!this.isSidebarMinimized) {
      this.dataService.minimizeSidebar();
    } else {
      this.dataService.maximizeSidebar();
    }
  }
}
