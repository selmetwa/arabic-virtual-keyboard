import { LitElement, html, css } from "lit";

import * as Types from "./constants/types.js";
import {
  button_groups,
  shifted_button_groups,
} from "./constants/button_groups.js";

import { 
  isNumber, 
  isArrowKey, 
  crypt, 
  isSpecialCharacter, 
  isLetter, 
  checkPreviousLetter, 
  isDiacriticMark 
} from "./utils.js/index.js";

import { NumbersFactory } from "./Numbers/index.js";
import { BackspaceFactory } from "./Backspace/index.js";
import { MouseCutFactory, UpdateSelectedTextFactory, TextareaClickFactory } from "./MouseEvents/index.js";
import { PasteFactory } from "./Paste/index.js";
import { KeyboardShortcutFactory, KeyboardNavigationFactory } from "./KeyboardEvents/index.js";
import { SpaceFactory } from "./Space/index.js";
import { SpecialCharacterFactory } from "./SpecialCharacters/index.js";
import { LettersFactory } from "./Letters/index.js";
import { DiacriticsFactory } from "./Diacritics/index.js";
import { TabFactory } from "./Tab/index.js";
import { EnterFactory } from "./Enter/index.js";

class ArabicKeyboard extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      button_groups: { type: Array },
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
      --gap: 4px;
      --font-size: 18px;
      --width: 50px;
      --border-radius: 4px;
      --background-color: #ececec;
      --border: 1px solid #999999;
      --active-background-color: #d6d6d6;
      --active-border: 1px solid #8f8f8f;
      --button-padding: 4px;
      --button-color: #000000;
      --button-shifted-color: #ff0000;
      --hover-background-color: #E0E0E0;
    }

    .wrapper {
      margin: auto;
      max-width: 800px;
      // outline: 1px solid black;
      // padding: 8px;
      font-family: sans-serif;
    }

    .keyboard {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: var(--border-radius);
      border: 1px solid var(--background-color);
      padding: 4px;
      gap: 4px;
    }

    .space {
      width: 100%;
    }

    .textarea {
      width: 100%;
      border-radius: var(--border-radius);
      direction: rtl;
      max-width: 100%;
      min-width: 100%;
      text-align: right;
      font-size: var(--font-size);
      font-weight: 500;
    }

    .keyboard_row {
      display: grid;
      gap: var(--gap);
      width: 100%;
    }

    .keyboard_row.first_row {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr
    }
    .keyboard_row.second_row {
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr
    }
    .keyboard_row.third_row {
      grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr
    }
    .keyboard_row.fourth_row {
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr
    }
    .keyboard_row.sixth_row {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr
    }
    .keyboard_row.fifth_row {
      grid-template-columns: 2fr 12fr;
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

    button {
      position: relative;
    }

    .button {
      font-size: var(--font-size);
      border-radius: var(--border-radius);
      background-color: var(--background-color);
      border: var(--border);
      height: var(--width);
      padding: 0;
    }

    .button:hover {
      background-color: var(--hover-background-color);
    }

    .button_value {
      color: var(--button-color);
      font-size: 16px;
      padding: 0;
      margin: 0;
    }

    .button_shifted {
      position: absolute;
      top: 2px;
      right: 4px;
      padding: 0;
      margin: 0;
      font-size: 14px;
      color: var(--button-shifted-color);
    }

    .button_en {
      position: absolute;
      top: 2px;
      left: 2px;
      padding: 0;
      margin: 0;
      font-size: 14px;
      color: blue;
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
    this.startPreviousKeyInterval();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearPreviousKeyInterval();
  }

  clearPreviousKeyInterval() {
    clearInterval(this.previousKeyIntervalId);
  }

  startPreviousKeyInterval() {
    this.previousKeyIntervalId = setInterval(() => {
      this.updateState({ previousKey: "" });
      this.requestUpdate();
    }, 500);
  }

  /**
   * Function to update the state of our keyboard
   * @param {Types.State} newState - new state of our keyboard
   */
  updateState(newState) {
    this.state = { ...this.state, ...newState };
  }

  getClassName(key) {
    
  }
  handleAddActiveState(key) {
    const cryptedClassname = crypt("salt", key);
    const target = `.button_${cryptedClassname}`;
    const keysPressed = this.shadowRoot.querySelectorAll(target);
    const nodes = Array.from(keysPressed);

    nodes.forEach((node) => {
      node && node.classList.add("active");
    })
  }

  handleKeyUp(event) {
    let key;
    if (event.key === "'") {
      const previousLetter = checkPreviousLetter(this.state.textValue, this.state.cursorPosition);
      console.log({ previousLetter });
      if (["d'", "g'", "s'", "t'", "h'", "H'"].includes(previousLetter)) {
        key = previousLetter;
      }
    }
    else if (event.key === "Meta") {
      key = "meta"
    } else if (event.code === "Space") {
      key = "space"
    } else {
      key = event.key;
    }
    console.log({ key });
    const cryptedClassname = crypt("salt", key);
    const target = `.button_${cryptedClassname}`;
    const keysPressed = this.shadowRoot.querySelectorAll(target);
    const nodes = Array.from(keysPressed);

    nodes.forEach((node) => {
      node && node.classList.remove("active");
    })

    if (["CapsLock", "Shift"].includes(key)) {
      this.buttonGroups = button_groups;
      this.requestUpdate();
    }
  }

  handleKeyDown(event) {
    event.preventDefault();
    this.clearPreviousKeyInterval();
    const key = event.key;
    console.log({ key });

    if (["CapsLock", "Shift"].includes(key)) {
      this.buttonGroups = shifted_button_groups;
      this.requestUpdate();
    }

    if (this.state.previousKey === "Meta") {
      this.startPreviousKeyInterval();
      return this.updateState(KeyboardShortcutFactory(key, this.state, this.textarea));
    }

    if (key === "Meta") {
      this.handleAddActiveState("meta")
      this.updateState({ previousKey: key });
    }

    if (key === 'Enter') {
      this.updateState(EnterFactory(this.state, this.textarea));
    }

    if (key === 'Tab') {
      this.updateState(TabFactory(this.state));
    }

    if (key === "Backspace") {
      this.updateState(BackspaceFactory(key, this.state));
    }

    if (event.code === "Space") {
      this.handleAddActiveState("space")
      this.updateState(SpaceFactory(this.state));
    }

    if (key === "'") {
      const previousLetter = checkPreviousLetter(this.state.textValue, this.state.cursorPosition);
      if (['d', 'g', 's', 't', 'h', 'H'].includes(previousLetter)) {
        const newKey = previousLetter + "'";
        this.updateState(BackspaceFactory(key, this.state));
        this.handleAddActiveState(newKey)
        return this.updateState(LettersFactory(newKey, this.state));
      } else {
        return
      }
    }

    if (isNumber(key)) {
      this.updateState(NumbersFactory(key, this.state));
    }

    if (isLetter(key)) {
      this.updateState(LettersFactory(key, this.state));
    }

    if (isDiacriticMark(key)) {
      this.updateState(DiacriticsFactory(key, this.state));
    }

    if (isArrowKey(key)) {
      this.updateState(KeyboardNavigationFactory(key, this.state, this.textarea))
    }

    // Handle Inserting Special Characters (rename to punctuation)
    if (isSpecialCharacter(key)) {
      this.updateState(SpecialCharacterFactory(key, this.state, this.textarea));
    }

    this.handleAddActiveState(key);
    this.startPreviousKeyInterval();
  }

  handleButtonClick(event) {
    event.preventDefault();
    const key = event.target.value;
    this.handleAddActiveState(`.button_${key}`);
    const target = event.target;
    console.log({ key, target });
    if (key === "space") {
      this.updateState(SpaceFactory(this.state));
    }

    if (isNumber(key)) {
      this.updateState(NumbersFactory(key, this.state));
    }

    if (key === "Backspace") {
      this.updateState(BackspaceFactory(key, this.state));
    }

    this.textarea.focus();
  }

  handlePaste(event, pastedTextFromKeyboard) {
    event && event.preventDefault();
    const pastedText = (event && event.clipboardData && event.clipboardData.getData("text")) || pastedTextFromKeyboard
    this.updateState(PasteFactory(pastedText, this.state));
  }

  updateSelectedText(event) {
    this.updateState(UpdateSelectedTextFactory(event));
  }

  handleTextareaClick(event) {
    event.preventDefault();
    this.updateState(TextareaClickFactory(event));
  }

  handleCopy(event) {
    event.preventDefault();
    document.execCommand("copy");
    event.clipboardData.setData(
      "text/plain",
      this.state.selectedText.toString()
    );
    this.updateState({ copiedText: this.state.selectedText });
  }

  handleCut(event) {
    event.preventDefault();
    document.execCommand("copy");
    event.clipboardData.setData(
      "text/plain",
      this.state.selectedText.toString()
    );
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
          @keyup="${this.handleKeyUp}"
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
            const { buttons, name } = buttonGroup;
            return html`
              <div class="keyboard_row ${name}">
                ${buttons.map(
                  (button) => {
                    const cryptedClass = crypt("salt", button.en);
                    return html` <button
                        value="${button.en}"
                        type="button"
                        class="button button_${cryptedClass} ${button.modifierClass}"
                        title="${button.title}"
                        @click="${this.handleButtonClick}"
                      >
                      <div class="button_inner">
                      ${button && button.shifted
                          ? html`<p class="button_shifted">
                              ${button.shifted}
                            </p>`
                          : ""}
                        ${button && button.label
                          ? html`<p class="button_en">
                              ${button.label}
                            </p>`
                          : ""}
                        <p class="button_value">${button.ar}</p>
                      </div>
                      </button>
                    </div> `
                  }
                )}
              </div>
            `;
          })}
        </div>
      </section>
      <div>
        <ul>
          <li>textValue: ${this.state.textValue}</li>
          <li>historyIndex: ${this.state.historyIndex}</li>
          <li>selectedText: ${this.state.selectedText}</li>
          <li>copiedText: ${this.state.copiedText}</li>
          <li>previousKey: ${this.state.previousKey}</li>
          <li>cursorPosition: ${this.state.cursorPosition}</li>
        </ul>
      </div>
    `;
  }
}

customElements.define("arabic-keyboard", ArabicKeyboard);
