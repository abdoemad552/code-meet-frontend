import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  isModalOpen = false;
  formData = {
    title: '',
    description: ''
  };

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  onSubmit() {
    // Handle form submission here
    console.log('Form submitted:', this.formData);
    this.closeModal();
  }

  private resetForm() {
    this.formData = {
      title: '',
      description: ''
    };
  }
}
