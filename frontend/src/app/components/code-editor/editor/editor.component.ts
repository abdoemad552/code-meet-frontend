import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges, OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {EditorView} from '@codemirror/view';
import {Compartment, EditorSelection, EditorState} from '@codemirror/state';
import {javascript} from '@codemirror/lang-javascript';
import {basicSetup} from 'codemirror';
import {keymap} from '@codemirror/view';
import {githubLight} from '@uiw/codemirror-theme-github';
import {html} from '@codemirror/lang-html';
import {css} from '@codemirror/lang-css';
import {java} from '@codemirror/lang-java';
import {oneDark} from '@codemirror/theme-one-dark';
import {cpp} from '@codemirror/lang-cpp';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() language: 'javascript' | 'html' | 'css' | 'java' = 'javascript';
  @Input() theme: 'oneDark' | 'githubLight' = 'githubLight';
  @Input() code: string = '';
  @Output() codeChange = new EventEmitter<string>();
  @ViewChild('editor', { static: true }) editor: ElementRef;

  private view: EditorView;
  private languageCompartment = new Compartment();
  private themeCompartment = new Compartment();

  ngAfterViewInit(): void {
    this.initializeCodeMirror();
  }

  /**
   * Angular lifecycle hook: Called when any data-bound input property changes.
   * We use this to update the CodeMirror editor if the `code` input changes.
   * @param changes Object containing current and previous property values.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.view) {
      if (changes['code']) {
        const newCode = changes['code'].currentValue;
        if (this.view.state.doc.toString() !== newCode) {
          this.setCode(newCode);
        }
      }

      if (changes['language']) {
        const newLanguage = changes['language'].currentValue;
        const newLanguageExtension = this.getLanguageExtension(newLanguage);
        if (newLanguageExtension) {
          this.setLanguageExtension(newLanguageExtension);
        } else {
          console.warn(`Illegal language (${newLanguage})...`)
        }
      }

      if (changes['theme']) {
        const newTheme = changes['theme'].currentValue;
        const newThemeExtension = this.getThemeExtension(newTheme);
        if (newThemeExtension) {
          this.setThemeExtension(newThemeExtension);
        } else {
          console.warn(`Illegal theme ${newTheme}...`)
        }
      }
    }
  }

  /**
   * Angular lifecycle hook: Called once, before the component is destroyed.
   * We clean up the CodeMirror editor to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy();
    }
  }

  /**
   * Initializes the CodeMirror 6 editor instance.
   */
  private initializeCodeMirror(): void {
    const initialLanguageExtension = this.getLanguageExtension(this.language);
    const initialThemeExtension = this.getThemeExtension(this.theme);

    // Define the extensions for the editor
    const extensions = [
      basicSetup, // Provides basic functionality like undo/redo, line numbers, etc.
      this.languageCompartment.of(initialLanguageExtension || javascript()),
      this.themeCompartment.of(initialThemeExtension || githubLight),
      EditorView.updateListener.of(update => {
        // Listen for document changes and emit the new code to the parent
        if (update.docChanged) {
          const newCode = update.state.doc.toString();
          this.codeChange.emit(newCode);
        }
      }),
      // Custom styling for responsiveness and full height
      EditorView.theme({
        "&": {
          height: "100%", // Make editor take full height of its container
          fontSize: "1.2rem", // Default font size
        },
        ".cm-scroller": {
          overflow: "auto", // Ensure scrollbars appear when content overflows
        }
      }),
      keymap.of([
        {
          key: "Tab",
          preventDefault: true,
          run: (view: EditorView) => {
            const changes = view.state.changeByRange(range => {
              return {
                changes: { from: range.from, to: range.to, insert: "\t" },
                range: EditorSelection.cursor(range.from + 1)
              };
            });
            view.dispatch(view.state.update(changes));
            return true;
          }
        }
      ])
    ];

    // Create the initial editor state
    const startState = EditorState.create({
      doc: this.code,
      extensions: extensions
    });

    // Create the editor view and attach it to the host element
    this.view = new EditorView({
      state: startState,
      parent: this.editor.nativeElement
    });
  }

  setLanguageExtension(newLanguageExtension: any) {
    if (this.view) {
      this.view.dispatch({
        effects: this.languageCompartment.reconfigure(newLanguageExtension)
      });
    }
  }

  setThemeExtension(newThemeExtension: any) {
    if (this.view) {
      this.view.dispatch({
        effects: this.themeCompartment.reconfigure(newThemeExtension)
      });
    }
  }

  setCode(newCode: string) {
    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: newCode
      },
      // Ensure the cursor stays at the end or a sensible position
      selection: { anchor: newCode.length }
    });
  }

  getLanguageExtension(language: string): any {
    switch (language) {
      case 'javascript':
        return javascript();
      case 'html':
        return html();
      case 'css':
        return css();
      case 'java':
        return java();
      case 'cpp':
        return cpp();
      default:
        return null;
    }
  }

  getThemeExtension(themeType: string): any {
    switch (themeType) {
      case 'oneDark':
        return oneDark;
      case 'githubLight':
        return githubLight;
      default:
        return null;
    }
  }
}
