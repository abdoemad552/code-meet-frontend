import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-meetingstabs',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './meetingstabs.component.html',
  styleUrl: './meetingstabs.component.css'
})
export class MeetingsTabsComponent {
  tabs: ({ name: string; id: string })[] = [
    { id: 'coming', name: 'Coming Meetings' },
    { id: 'previous', name: 'Previous Meetings' }
  ];
  selectedTab = 'coming';

  getTabClasses(tabId: string) {
    const isActive = this.selectedTab === tabId;
    return [
      'cursor-pointer px-4 py-5 text-lg',
      'transition-colors duration-200',
      isActive
        ? 'text-indigo-700 font-bold border-b border-indigo-700'
        : 'text-gray-500 hover:text-indigo-700'
    ].join(' ');
  }
}
