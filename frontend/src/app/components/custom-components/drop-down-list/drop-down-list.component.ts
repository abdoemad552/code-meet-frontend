import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {dropdownAnimation} from '../../../shared/animations';

interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'drop-down-list',
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ],
  animations: [dropdownAnimation],
  templateUrl: './drop-down-list.component.html',
  styleUrl: './drop-down-list.component.css'
})
export class DropDownListComponent {
  @Input() dark: boolean = true;
  @Input() options: Option[] = [];
  @Input() selectedOption: string;
  @Output() selectedOptionChange = new EventEmitter<string>();
  @ViewChild('dropdownContainer') dropdownContainer: ElementRef;

  isOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.isOpen && !this.dropdownContainer.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (this.isOpen) {
      this.isOpen = false;
      event.preventDefault();
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: Option): void {
    this.selectedOptionChange.emit(option.value);
    this.isOpen = false; // Close dropdown after selection
  }

  get selectedOptionLabel(): string {
    const found = this.options.find(option => option.value === this.selectedOption);
    return found ? found.label : 'Select Option';
  }
}
