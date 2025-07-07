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
import {EditorView, highlightActiveLineGutter} from '@codemirror/view';
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
import {Language, Theme} from '../../../shared/code-editor.config';
import {python} from '@codemirror/lang-python';
import {bracketMatching} from '@codemirror/language';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() language: Language;
  @Input() theme: Theme;
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
      highlightActiveLineGutter(),
      bracketMatching(),
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
          height: "100%",
          backgroundColor: "transparent",
          fontSize: "1rem",
          fontFamily: `'JetBrains Mono', monospace`,
          borderRadius: "0.75rem",
          border: "2px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
          outline: "none"
        },
        ".cm-editor": {
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        },
        "&.cm-focused": {
          outline: "none"
        },
        ".cm-scroller": {
          overflow: "auto",
          scrollbarWidth: "thick",
          scrollbarColor: "#a5b4fc #f3f4f6",
        },
        ".cm-content": {
          fontFamily: `'JetBrains Mono', monospace`,
          fontSize: "1rem"
        },
        ".cm-line": {
          lineHeight: "1.3",
          padding: "1px"
        },
        ".cm-activeLine": {
          backgroundColor: "transparent",
        },
        ".cm-gutters": {
          backgroundColor: "transparent",
          color: "#9ca3af",
          borderRight: "1px solid #e5e7eb"
        },
        ".cm-gutterElement": {
          height: "1.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        ".cm-lineNumbers": {
          fontFamily: `'JetBrains Mono', monospace`,
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          justifyItems: "center"
        },
        ".cm-activeLineGutter": {
          color: "#6357ff",
          backgroundColor: "transparent",
          userSelect: "none"
        },
        ".cm-cursor": {
          borderLeft: "2px solid #6357ff"
        },
        '.cm-matchingBracket': {
          fontWeight: 'bold',
          borderRadius: '2px',
        },
        '.cm-nonmatchingBracket': {
          fontWeight: 'bold',
          borderRadius: '2px',
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
      case 'python':
        return python();
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
