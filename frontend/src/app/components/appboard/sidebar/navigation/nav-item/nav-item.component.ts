import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'nav-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TitleCasePipe, RouterModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css',
})
export class NavItemComponent {
  @Input() title!: string;
  @Input() icon!: string;
  @Input() routeLink!: string;
}
