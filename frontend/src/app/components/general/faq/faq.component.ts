import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

interface AccordionItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})

export class FAQComponent {
  accordionItems: AccordionItem[] = [
    {
      question: 'What are our main goals?',
      answer: 'Anything lies here!',
      isOpen: false
    },
    {
      question: 'When our product will be launched?',
      answer: 'Our product launch are scheduled..',
      isOpen: false
    },
    {
      question: 'How to use the product correctly?',
      answer: 'Anything here!',
      isOpen: false
    }];

  toggleAccordion(index: number) {
    // Close all items except the clicked one
    this.accordionItems.forEach((item, i) => {
      item.isOpen = i === index ? !item.isOpen : false;
    });
  }

  getMaxHeight(content: HTMLElement): string {
    return content.scrollHeight + 'px';
  }
}
