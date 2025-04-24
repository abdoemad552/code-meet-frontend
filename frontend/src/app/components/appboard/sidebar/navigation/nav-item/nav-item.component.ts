import {NgClass, NgIf, TitleCasePipe} from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import {BoardDataService} from '../../../../../services/states/board-data.service';

@Component({
  selector: 'nav-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TitleCasePipe, RouterModule, NgClass, NgIf],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css',
})
export class NavItemComponent {
  @Input() title!: string;
  @Input() icon!: string;
  @Input() routeLink!: string;
  isSidebarMinimized!: boolean;

  constructor(private dataService: BoardDataService) {
  }

  ngOnInit() {
    this.dataService.isSidebarMinimized$.subscribe(isSidebarMinimized => {
      this.isSidebarMinimized = isSidebarMinimized;
    })
  }
}
