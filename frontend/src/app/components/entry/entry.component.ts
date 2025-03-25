import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-entry',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgClass],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent {
  mainFeatures : string[] = ["Interactive code meetings with your colleuges with an embedded code editor and voice sharing.", "Rooms to share messages with your friends."];

  isMainFeaturesHidden = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('userInfo')) {
      this.router.navigateByUrl('/home');
    }
  }

  toggleMainFeatures() {
    this.isMainFeaturesHidden = !this.isMainFeaturesHidden;
  }
}
