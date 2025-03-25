import {Component} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgClass} from '@angular/common';
import {HomeComponent} from '../home/home.component';
import {RouterOutlet, Router} from '@angular/router';
import {BoardDataService} from '../../services/board-data.service';

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

  constructor(private router: Router, private dataService: BoardDataService) {}

  ngOnInit() {
    this.dataService.isSidebarMinimized$.subscribe(isSidebarMinimized => {
      this.isSidebarMinimized = isSidebarMinimized;
    });

    this.dataService.isPadding$.subscribe((isPadding: boolean) => this.Padding = isPadding);
  }
}
