import { LitElement, html, css } from "lit";

import { button_groups } from "./constants/button_groups.js";

import {
  isNumber,
  getSelectedText,
  isLeftArrow,
  isRightArrow,
  deleteSelectedText,
  isInputArabic
} from "./utils.js/index.js";

import { NumbersFactory } from "./Numbers/index.js";
import { BackspaceFactory } from "./Backspace/index.js";
import { KeyboardNavigationFactory } from "./KeyboardNavigation/index.js";

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

  updateState(object) {
    console.log({ object })
    this.state = { ...this.state, ...object };
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
    const key = event.key;
    const isNumberKey = isNumber(key);
    this.clearInterval();
    console.log({ key, event })
    
    this.handleAddActiveState(`.button_${key}`)

    // Handle Meta Key
    if (key === "Meta") {
      this.updateState({ previousKey: key });
    }

    if (this.state.previousKey === "Meta" && key === "a") {
      this.textarea.select();
    }

    if (this.state.previousKey === "Meta" && key === "c") {
      document.execCommand("copy");
      console.log({ selectedText: this.state.selectedText })
      this.updateState({ copiedText: this.state.selectedText });
    }

    if (this.state.previousKey === "Meta" && key === "x") {
      document.execCommand("copy");
      const res = deleteSelectedText(this.state.textValue, this.state.selectedText);
      this.updateState({ 
        textValue: res, 
        cursorPosition: res.length,
        copiedText: this.state.selectedText,
        history: [...this.state.history, this.state.textValue], 
        historyIndex: this.state.historyIndex + 1 
      });
    }

    // Handle Paste from Keyboard shortcut
    if (this.state.previousKey === "Meta" && key === "v") {
      this.handlePaste(null, this.state.copiedText);
    }

    if (this.state.previousKey === "Meta" && key === "z") {
      if (this.state.historyIndex >= 0) {
        const textValue = this.state.history[this.state.historyIndex];
        const historyIndex = this.state.historyIndex - 1;
        const newHistory = this.state.history.slice(0, this.state.historyIndex);
        this.updateState({ textValue, historyIndex, cursorPosition: textValue.length, history: newHistory });
      }
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
    const target = event.target;
    const selectedText = getSelectedText(target);
    return this.updateState({
      ...this.state,
      cursorPosition: event.target.selectionStart,
      selectedText: selectedText,
    });
  }

  handlePaste(event, pastedTextFromKeyboard) {
    event && event.preventDefault();
    const pastedText = event && event.clipboardData && event.clipboardData.getData("text") || pastedTextFromKeyboard;

    if (isInputArabic(pastedText)) {
      console.log({ pastedText, selectedText: this.state.selectedText })
      // handle selected text
      let _textValue = this.state.textValue;
      if (!!this.state.selectedText) {
        _textValue = deleteSelectedText(_textValue, this.state.selectedText);
      }
      let modifiedString = _textValue.slice(0, this.state.cursorPosition) + pastedText + _textValue.slice(this.state.cursorPosition);
      return this.updateState({ 
        textValue: modifiedString, 
        cursorPosition: this.state.cursorPosition + pastedText.length,
        history: [...this.state.history, this.state.textValue],
        historyIndex: this.state.historyIndex + 1,
        selectedText: "",
      });
    }

    for (let i = 0; i < pastedText.length; i++) {
      const char = pastedText[i];
      if (isNumber(char)) {
        this.updateState(NumbersFactory(char, this.state));
      }
    }
  }

  handleTextareaClick(event) {
    const target = event.target;
    const selectedText = getSelectedText(target);
    event.preventDefault();
    this.updateState({
      ...this.state,
      cursorPosition: event.target.selectionStart,
      selectedText: selectedText,
    });
  }

  handleButtonClick(event) {
    event.preventDefault();
    const value = event.target.value;
    const [type, key] = value.split("_");

    this.handleAddActiveState(`.button_${key}`)
    if (type === "number") {
      this.updateState(NumbersFactory(key, this.state));
    }

    if (type === "alphabet" && key === "Backspace") {
      this.updateState(BackspaceFactory(key, this.state));
    }
  }

  handleCopy(event) {
    const selection = this.state.selectedText;
    console.log("copy", { event, selection })
    event.clipboardData.setData("text/plain", selection.toString());
    this.updateState({ copiedText: selection });
    event.preventDefault();
  }

  handleCut(event) {
    const selection = this.state.selectedText;
    let _textValue = this.state.textValue;
    if (!!this.state.selectedText) {
      _textValue = deleteSelectedText(_textValue, this.state.selectedText);
    }
    event.clipboardData.setData("text/plain", selection.toString());
    this.updateState({ 
      copiedText: selection, 
      textValue: _textValue, 
      cursorPosition: this.state.cursorPosition - selection.length,
      selectedText: "", 
    });
    event.preventDefault();
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
              <div class="button_group ${type === "number" ? "ltr " : "rtl"}">
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
          <button class="space">Space</button>
        </div>
      </section>
      <div>${JSON.stringify(this.state)}</div>
      <p>textvalue length: ${this.state.textValue?.length}</p>
    `;
  }
}

customElements.define("arabic-keyboard", ArabicKeyboard);
