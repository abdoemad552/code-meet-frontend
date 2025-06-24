import {Component} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgClass} from '@angular/common';
import {RouterOutlet, Router} from '@angular/router';
import {BoardDataService} from '../../services/states/board-data.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgClass, RouterOutlet],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  isSidebarMinimized: boolean = false;
  Padding : boolean = true;

  constructor(
    private router: Router,
    private dataService: BoardDataService
  ) {}

  ngOnInit() {
    this.dataService.isSidebarMinimized$
      .subscribe({
        next: isSidebarMinimized =>
          this.isSidebarMinimized = isSidebarMinimized
      });
    this.dataService.isPadding$
      .subscribe({
        next: isPadding => this.Padding = isPadding
      });
  }
}
