import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgForOf, NgIf} from '@angular/common';

interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'drop-down-list',
  imports: [
    NgIf,
    NgForOf
  ],
  animations: [
    trigger('dropdownAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.95) translateY(-10px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      })),
      transition('void => *', [
        animate('150ms ease-out')
      ]),
      transition('* => void', [
        animate('100ms ease-in')
      ])
    ])
  ],
  templateUrl: './drop-down-list.component.html',
  styleUrl: './drop-down-list.component.css'
})
export class DropDownListComponent {
  @Input() label: string;
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

  // Helper to check if the click was inside the dropdown button or panel
  private isClickInsideDropdown(targetElement: HTMLElement): boolean {
    const dropdownButton = document.getElementById('menu-button');
    const dropdownPanel = this.dropdownContainer?.nativeElement; // Access the native element

    return (dropdownButton && dropdownButton.contains(targetElement)) ||
      (dropdownPanel && dropdownPanel.contains(targetElement));
  }

  /**
   * Toggles the visibility of the dropdown menu.
   */
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  /**
   * Selects a language from the dropdown and emits the change.
   * @param option The selected LanguageOption object.
   */
  selectOption(option: Option): void {
    this.selectedOptionChange.emit(option.value);
    this.isOpen = false; // Close dropdown after selection
  }

  /**
   * Returns the label of the currently selected language for display in the button.
   */
  get selectedOptionLabel(): string {
    const found = this.options.find(option => option.value === this.selectedOption);
    return found ? found.label : 'Select Option';
  }
}
