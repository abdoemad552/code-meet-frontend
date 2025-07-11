import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EditorComponent} from './editor/editor.component';
import {DropDownListComponent} from '../custom-components/drop-down-list/drop-down-list.component';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {fadeInOut} from '../../shared/animations';
import {languages, themes} from '../../shared/code-editor.config';
import {Judge0Service} from '../../services/judge0.service';
import {catchError, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-code-editor',
  imports: [
    EditorComponent,
    DropDownListComponent,
    FormsModule,
    NgClass,
    NgIf
  ],
  animations: [fadeInOut],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css'
})
export class CodeEditorComponent {
  @Input() code: string = languages[1].initialCode;
  @Output() codeChange = new EventEmitter<string>();

  theme: any = themes[0];
  language: any = languages[1];
  input: string = '';
  output: string = '';
  error: string = '';
  compilationOutput: string = '';
  ioShown: boolean = false;
  isSubmitting: boolean = false;

  constructor(private judge0: Judge0Service) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ioShown = true;
    }, 200);
  }

  onRunCode(): void {
    this.isSubmitting = true;
    this.output = '';
    this.error = '';

    const code = this.code;
    const id = this.language.id;
    const input = this.input;

    console.log('Submitting...');
    this.judge0.submitCode(code, id, input).pipe(
      switchMap(result => {
        const token = result.token;
        return this.judge0.pollResult(token);
      }),
      catchError(err => {
        console.error(err);
        this.error = 'Execution failed';
        this.isSubmitting = false;
        return of(null);
      })
    ).subscribe({
        next: result => {
          if (result) {
            console.log(result);
            this.output = this.judge0.decode(result.stdout);
            this.error = this.judge0.decode(result.stderr ? result.stderr : result.compile_output);
            this.isSubmitting = false;
            this.ioShown = true;
            console.log('Finished');
          }
        }
      });
  }

  onCodeChange(code: string): void {
    this.code = code;
    this.codeChange.emit(code);
  }

  onSelectedLanguageChange(value: string) {
    this.language = this.languages.find(l => l.value === value);
    this.code = this.language.initialCode;
  }

  onSelectedThemeChange(value: string) {
    this.theme = this.themes.find(t => t.value === value);
  }

  onCopyInput() {
    navigator.clipboard.writeText(this.output);
  }

  onEraseInput() {
    this.input = '';
  }

  onCopyOutput() {
    navigator.clipboard.writeText(this.output);
  }

  onEraseOutput() {
    this.output = '';
  }

  onCopyError() {
    navigator.clipboard.writeText(this.error);
  }

  onEraseError() {
    this.error = '';
  }

  onToggleIO() {
    this.ioShown = !this.ioShown;
  }

  get languages() {
    return languages;
  }

  get themes() {
    return themes;
  }
}
