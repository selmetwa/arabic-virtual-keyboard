import { LitElement, html, css } from "lit";

import { button_groups } from "./constants/button_groups.js";

import {
  isNumber,
  isLeftArrow,
  isRightArrow,
} from "./utils.js/index.js";

import * as Types from "./constants/types.js";
import { NumbersFactory } from "./Numbers/index.js";
import { BackspaceFactory } from "./Backspace/index.js";
import { MouseCutFactory, UpdateSelectedTextFactory, TextareaClickFactory } from "./MouseEvents/index.js";
import { PasteFactory } from "./Paste/index.js";
import { KeyboardShortcutFactory, KeyboardNavigationFactory } from "./KeyboardEvents/index.js";
import { SpaceFactory } from "./Space/index.js";

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
      historyIndex: 0,
      history: [],
      selectedText: "",
      copiedText: "",
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
      --border-radius: 4px;
      --background-color: #ececec;
      --border: 1px solid #999999;
      --active-background-color: #D6D6D6;
      --active-border: 1px solid #8F8F8F;
      --button-padding: 4px;
    }

    .wrapper {
      margin: auto;
      max-width: 700px;
      outline: 1px solid black;
      padding: 16px;
      font-family: sans-serif;
    }

    .keyboard {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .space {
      width: 100%;
    }

    .textarea {
      width: 100%;
      direction: rtl;
      resize: none;
      text-align: right;
      font-size: var(--font-size);
    }
    
    .button_group {
      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      gap: var(--gap);
    }

    .button_wrapper {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    .label {
      direction: ltr;
    }

    .rtl {
      margin-top: 10px;
      direction: rtl;
    }

    .button {
      font-size: var(--font-size);
      border-radius: var(--border-radius);
      background-color: var(--background-color);
      border: var(--border);
      padding: var(--button-padding);
    }
    .active {
      background-color: var(--active-background-color);
      border: var(--active-border);
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
      if (this.state.previousKey !== '') {
        this.updateState({ previousKey: '' });
      }
      this.requestUpdate();
    }, 1000);
  }

  /**
   * Function to update the state of our keyboard
   * @param {Types.State} newState - new state of our keyboard
   */
  updateState(newState) {
    this.state = { ...this.state, ...newState };
  }

  handleAddActiveState(target) {
    const keyPressed = this.shadowRoot.querySelector(target);
    keyPressed && keyPressed.classList.add('active');
    setTimeout(() => {
      keyPressed && keyPressed.classList.remove('active');
    }, 50)
  }

  handleKeyDown(event) {
    event.preventDefault();
    this.clearInterval();
    const key = event.key;
    const code = event.code;
    console.log({ key, event, code })
    this.handleAddActiveState(`.button_${key}`)

    if (this.state.previousKey === "Meta") {
      this.updateState(KeyboardShortcutFactory(key, this.state, this.textarea))
    }

    // Handle Meta Key
    if (key === "Meta") {
      this.updateState({ previousKey: key });
    }

    // Handle Deletion
    if (key === "Backspace") {
      this.updateState(BackspaceFactory(key, this.state));
    }

    if (event.code === 'Space') {
      this.updateState(SpaceFactory(this.state))
    }

    // Handle Inserting Numbers
    if (isNumber(key)) {
      this.updateState(NumbersFactory(key, this.state));
    }

    // Update Cursor Position
    if (isLeftArrow(key) || isRightArrow(key)) {
      this.updateState(KeyboardNavigationFactory(key, this.state, this.textarea));
    }

    this.startInterval();
  }

  handleButtonClick(event) {
    event.preventDefault();
    const value = event.target.value;
    const [type, key] = value.split("_");
    console.log({ type, key })
    this.handleAddActiveState(`.button_${key}`)

    if (type === "misc") {
      if (key === "space") {
        this.updateState(SpaceFactory(this.state))
      }
    }

    if (type === "number") {
      this.updateState(NumbersFactory(key, this.state));
    }

    if (type === "alphabet" && key === "Backspace") {
      this.updateState(BackspaceFactory(key, this.state));
    }

    this.textarea.focus();
  }

  handlePaste(event, pastedTextFromKeyboard) {
    event && event.preventDefault();
    this.updateState(PasteFactory(event && event.clipboardData && event.clipboardData.getData("text") || pastedTextFromKeyboard, this.state));
  }

  updateSelectedText(event) {
    this.updateState(UpdateSelectedTextFactory(event));
  }

  handleTextareaClick(event) {
    event.preventDefault();
    this.updateState(TextareaClickFactory(event))
  }

  handleCopy(event) {
    event.preventDefault();
    event.clipboardData.setData("text/plain", this.state.selectedText.toString());
    this.updateState({ copiedText: this.state.selectedText });
  }

  handleCut(event) {
    event.preventDefault();
    event.clipboardData.setData("text/plain", this.state.selectedText.toString());
    this.updateState(MouseCutFactory(this.state));
  }

  render() {
    return html`
      <noscript>
        <p>Please enable JavaScript to use this application.</p>
      </noscript>
      <section class="wrapper" lang="ar">
        <textarea
          contenteditable="true"
          aria-label="Text Area"
          type="text"
          class="textarea"
          lang="ar"
          rows="5"
          cols="10"
          @keydown="${this.handleKeyDown}"
          @select="${this.updateSelectedText}"
          @paste="${this.handlePaste}"
          @copy="${this.handleCopy}"
          @cut="${this.handleCut}"
          @click="${this.handleTextareaClick}"
          .value=${this.state.textValue}
        >
        </textarea>
        <div class="keyboard">
          ${this.buttonGroups.map((buttonGroup) => {
            const { buttons, type } = buttonGroup;
            return html`
              <div class="button_group ${type === "number" ? "ltr" : "rtl"}">
                ${buttons.map(
                  (button) =>
                    html`<div class="button_wrapper">
                      <label class="label">${button.label[0]}</label>
                      <button
                        value="${type}_${button.label[0]}"
                        type="button"
                        class="button button_${button.label[0]}"
                        title="${button.title}"
                        @click="${this.handleButtonClick}"
                      >
                        ${button.ar}
                      </button>
                    </div> `
                )}
              </div>
            `;
          })}
          <button 
          class="space button button_ " 
          @click="${this.handleButtonClick}"
          value="misc_space"
          >Space</button>
        </div>
      </section>
      <div>${JSON.stringify(this.state)}</div>
      <p>textvalue length: ${this.state.textValue?.length}</p>
    `;
  }
}

customElements.define("arabic-keyboard", ArabicKeyboard);
