import {Component, HostListener} from '@angular/core';
import {EditorComponent} from './editor/editor.component';
import {DropDownListComponent} from '../custom-components/drop-down-list/drop-down-list.component';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-code-editor',
  imports: [
    EditorComponent,
    DropDownListComponent,
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css'
})
export class CodeEditorComponent {
  languages = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' }
  ];

  themes = [
    { label: 'One Dark', value: 'oneDark' },
    { label: 'Github Light', value: 'githubLight' },
  ];

  theme: 'oneDark' | 'githubLight' = 'githubLight';
  language: 'javascript' | 'html' | 'css' | 'java' = 'javascript';
  code: string = `// Start writing code...`;
  input: string = '';
  output: string = '';
  ioShown: boolean = true;

  /**
   * Executes the current code in a sandboxed environment and captures console output.
   * This is a basic example and should be enhanced for security and robustness
   * in a real-world application (e.g., using Web Workers or a backend execution service).
   */
  runCode(): void {
  }

  /**
   * Placeholder for saving the code. In a real app, this would
   * involve an API call to a backend.
   */
  saveCode(): void {
    console.log('Saving code:', this.code);
    alert('Code saved! (This is a placeholder action)');
    // Implement API call to save code to a database
  }

  /**
   * Placeholder for sharing the code. In a real app, this might
   * generate a shareable link or send the code to another user via API.
   */
  shareCode(): void {
    console.log('Sharing code:', this.code);
    alert('Code copied to clipboard for sharing! (Placeholder)');
    // Implement API call to share code or generate a unique URL
  }

  /**
   * Sets the language of the CodeMirror editor.
   * @param language A string indicating the desired language ('javascript', 'html', 'css', 'java').
   */
  setEditorLanguage(language: 'javascript' | 'html' | 'css' | 'java'): void {
    this.language = language;
  }

  copyOutput() {
    navigator.clipboard.writeText(this.output);
  }

  toggleIO() {
    this.ioShown = !this.ioShown;
  }
}
