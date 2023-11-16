import { LitElement, html, css } from "lit";

import { button_groups } from "./constants/button_groups.js";

import {
  isNumber,
  getSelectedText,
  isLeftArrow,
  isRightArrow,
  deleteSelectedText
} from "./utils.js/index.js";

import { NumbersFactory } from "./Numbers/index.js";
import { BackspaceFactory } from "./Backspace/index.js";
import { KeyboardNavigationFactory } from "./KeyboardNavigation/index.js";
import { PasteFactory } from "./Paste/index.js";

class ArabicKeyboard extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
    };
  }

  constructor() {
    super();
    this.textarea = null;
    this.buttonGroups = button_groups;
    this.state = {
      textValue: "",
      selectedText: "",
      previousKey: "",
      cursorPosition: 0,
    };
  }

  static styles = css`
    :host {
      --gap: 6px;
      --columns: 10;
      --font-size: 18px;
      --width: 50px;
    }

    .wrapper {
      margin: auto;
      max-width: 700px;
      outline: 1px solid black;
      padding: 16px;
      font-family: sans-serif;

      .textarea {
        width: 100%;
        direction: rtl;
        resize: none;
        text-align: right;
        font-size: var(--font-size);
      }

      .keyboard {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        .space {
          width: 100%;
        }
      }
    }

    .button_group {
      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      gap: var(--gap);

      .button_wrapper {
        display: flex;
        flex-direction: column;
        text-align: center;

        .label {
          direction: ltr;
        }
      }
    }

    .rtl {
      margin-top: 10px;
      direction: rtl;
    }

    .button {
      font-size: var(--font-size);
    }
  `;

  firstUpdated() {
    this.textarea = this.shadowRoot.querySelector("textarea");
  }

  connectedCallback() {
    super.connectedCallback();
    this.startInterval();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearInterval();
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      this.updateState({ previousKey: '' });
      this.requestUpdate();
    }, 500);
  }

  updateState(object) {
    this.state = { ...this.state, ...object };
  }

  handleKeyDown(event) {
    event.preventDefault();
    const key = event.key;
    const isNumberKey = isNumber(key);
    this.clearInterval();
    console.log({ key, event })

    // Handle Meta Key
    if (key === "Meta") {
      this.updateState({ previousKey: key });
    }

    if (this.state.previousKey === "Meta" && key === "a") {
      this.textarea.select();
    }

    if (this.state.previousKey === "Meta" && key === "c") {
      document.execCommand("copy");
    }

    if (this.state.previousKey === "Meta" && key === "x") {
      document.execCommand("copy");
      const res = deleteSelectedText(this.state.textValue, this.state.selectedText);
      this.updateState({ textValue: res});
      console.log({ res })
    }

    // Handle Paste from Keyboard shortcut
    if (this.state.previousKey === "Meta" && key === "v") {
      navigator.clipboard.readText()
        .then(clipboardText => {
          this.updateState(PasteFactory(null, clipboardText, this.state));
        })
        .catch(err => {
          console.error("Failed to read from clipboard", err);
        });
    }

    // Handle Deletion
    if (key === "Backspace") {
      this.updateState(BackspaceFactory(key, this.state));
    }

    // Handle Inserting Numbers
    if (isNumberKey) {
      this.updateState(NumbersFactory(key, this.state));
    }

    // Update Cursor Position
    if (isLeftArrow(key) || isRightArrow(key)) {
      const res = KeyboardNavigationFactory(key, this.state);
      this.textarea.setSelectionRange(res.cursorPosition, res.cursorPosition);
      this.updateState(res);
    }

    this.startInterval();
  }

  updateSelectedText(event) {
    return this.updateState({
      ...this.state,
      cursorPosition: event.target.selectionStart,
      selectedText: getSelectedText(this.textarea),
    });
  }

  handlePaste(event) {
    event.preventDefault();
    this.updateState(PasteFactory(event, this.state));
  }

  handleTextareaClick(event) {
    event.preventDefault();
    this.updateState({
      ...this.state,
      cursorPosition: event.target.selectionStart,
      selectedText: "",
    });
  }

  render() {
    return html`
      <noscript>
        <p>Please enable JavaScript to use this application.</p>
      </noscript>
      <section class="wrapper" lang="ar">
        <div>${JSON.stringify(this.state)}</div>
        <p>textvalue length: ${this.state.textValue.length}</p>
        <textarea
          aria-label="Text Area"
          type="text"
          class="textarea"
          lang="ar"
          rows="5"
          cols="10"
          @keydown="${this.handleKeyDown}"
          @select="${this.updateSelectedText}"
          @paste="${this.handlePaste}"
          @click="${this.handleTextareaClick}"
          .value=${this.state.textValue}
        >
        </textarea>
        <div class="keyboard">
          ${this.buttonGroups.map((buttonGroup) => {
            const { buttons, type } = buttonGroup;
            return html`
              <div class="button_group ${type === "number " ? "ltr " : "rtl"}">
                ${buttons.map(
                  (button) =>
                    html`<div class="button_wrapper">
                      <label class="label">${button.label[0]}</label>
                      <button
                        value="${type}_${button.label[0]}"
                        type="button"
                        class="button"
                        title="${button.title}"
                        @click="${this.handleClick}"
                      >
                        ${button.ar}
                      </button>
                    </div> `
                )}
              </div>
            `;
          })}
          <button class="space">Space</button>
        </div>
      </section>
    `;
  }
}

customElements.define("arabic-keyboard", ArabicKeyboard);
