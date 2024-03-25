import { LitElement, html, css } from "lit";

import * as Types from "./constants/types.js";
import {
  desktop_button_groups,
  shifted_desktop_button_groups,
  mobile_button_groups,
  shifted_mobile_button_groups,
} from "./constants/button_groups.js";

import { crypt } from "./utils/index.js";
import {
  MouseCutFactory,
  UpdateSelectedTextFactory,
  TextareaClickFactory,
} from "./Factories/MouseEvents/index.js";
import { PasteFactory } from "./Factories/Paste/index.js";
import { KeyboardShortcutFactory } from "./Factories/KeyboardEvents/index.js";
import { TaskMaster } from "./Factories/index.js";
import { ClickFactory } from "./Click/index.js";
import { RemoveActiveClassFactory } from "./Factories/RemoveActiveClass/index.js";

export class ArabicKeyboard extends LitElement {
  static get properties() {
    return {
      showShiftedValue: { type: String },
      showEnglishValue: { type: String },
      state: { type: Object },
      desktop_button_groups: { type: Array },
    };
  }

  constructor() {
    super();
    this.textarea = null;
    this.buttonGroups = desktop_button_groups;
    this.isMobile = false;
    this.state = {
      textValue: "",
      historyIndex: 0,
      history: [],
      selectedText: "",
      copiedText: "",
      cursorPosition: 0,
    };
  }

  static styles = css`
  :host {
    --keyboard-row-gap: 4px;
    --font-size: 18px;
    --max-keyboard-width: 800px;
    --row-height: 50px;
    --border-radius: 4px;
    --button-background-color: #ececec;
    --border: 1px solid #999999;
    --button-active-background-color: #d6d6d6;
    --button-active-border: 1px solid #8f8f8f;
    --button-padding: 4px;
    --button-color: #000000;
    --button-shifted-color: #ff0000;
    --button-eng-color: #0000ff;
    --button-hover-background-color: #e0e0e0;
    --textarea-background-color: #ffffff;
    --textarea-input-color: #000;
    --font-family: "Arial", sans-serif;
  }

  .keyboard_wrapper {
    max-width: var(--max-keyboard-width);
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
    font-family: var(--font-family);
  }

  .keyboard {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    border-radius: var(--border-radius);
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
    color: var(--textarea-input-color);
    background-color: var(--textarea-background-color);
  }

  .keyboard_row {
    display: grid;
    gap: var(--keyboard-row-gap);
    width: 100%;
    height: var(--row-height);
  }

  .keyboard_row.first_row_mobile {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  .keyboard_row.second_row_mobile {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  .keyboard_row.second_row_mobile_shifted {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  .keyboard_row.third_row_mobile_shifted {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
  }
  .keyboard_row.third_row_mobile {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
  }
  .keyboard_row.fourth_row_mobile {
    grid-template-columns: 1fr 4fr 1fr;
  }
  .keyboard_row.first_row {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
  }

  .keyboard_row.second_row {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  .keyboard_row.third_row {
    grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
  }

  .keyboard_row.fourth_row {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
  }

  .keyboard_row.sixth_row {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  .keyboard_row.fifth_row {
    grid-template-columns: 2fr 9fr 1fr;
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

  button > * {
    pointer-events: none;
  }

  .button:active {
    background-color: var(--button-active-background-color) !important;
    border: var(--button-active-border) !important;
  }

  .button {
    font-size: var(--font-size);
    border-radius: var(--border-radius);
    background-color: var(--button-background-color);
    border: var(--border);
    height: 100%;
    padding: 0;
  }

  .button:hover {
    background-color: var(--button-hover-background-color);
    border: var(--button-active-border);
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
    color: var(--button-eng-color);
  }

  .active {
    background-color: var(--button-active-background-color);
    border: var(--button-active-border);
  }

  .diacritic .button_value {
    font-size: 40px;
    position: absolute;
    top: 0;
    right: 20px;
  }

  .diacritic .button_en {
    font-size: 14px !important;
  }
`;

  firstUpdated() {
    this.textarea = this.shadowRoot.querySelector("textarea");

    const keyboardWrapper = this.shadowRoot.querySelector(".keyboard_wrapper");
      if (keyboardWrapper) {
        const resizeObserver = new ResizeObserver(this.handleResize.bind(this));
        resizeObserver.observe(keyboardWrapper);
      }
  }

  handleResize(entries) {
    const { width } = entries[0].contentRect;
    if (width < 600) {
      this.isMobile = true;
      this.buttonGroups = mobile_button_groups;
    } else {
      this.isMobile = false;
      this.buttonGroups = desktop_button_groups;
    }
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /**
   * Function to update the state of our keyboard
   * @param {Types.State} newState - new state of our keyboard
   */
  updateState(newState) {
    this.state = { ...this.state, ...newState };
  }

  handleToggleButtonGroups(groups) {
    this.buttonGroups = groups;
    this.requestUpdate();
  }

  handleAddActiveState(key) {
    const cryptedClassname = crypt("salt", key);
    const target = `.button_${cryptedClassname}`;
    const keysPressed = this.shadowRoot.querySelectorAll(target);
    const nodes = Array.from(keysPressed);

    nodes.forEach((node) => {
      node && node.classList.add("active");
    });
  }

  handleRemoveActiveState(key) {
    const cryptedClassname = crypt("salt", key);
    const target = `.button_${cryptedClassname}`;
    const keysPressed = this.shadowRoot.querySelectorAll(target);
    const nodes = Array.from(keysPressed);

    nodes.forEach((node) => {
      node && node.classList.remove("active");
    });
  }

  handleKeyUp(event) {
    RemoveActiveClassFactory(
      event,
      this.state,
      this.isMobile,
      this.shadowRoot,
      this.handleToggleButtonGroups.bind(this),
      this.handleRemoveActiveState.bind(this)
    );
  }

  handleKeyDown(event) {
    event.preventDefault();

    const key = event.code === "Space" ? "Space" : event.key;

    if (key === "audio") {
      return this.speakText();
    }
    if (event.metaKey) {
      this.handleAddActiveState("meta");
      this.handleAddActiveState(key);
      this.updateState(KeyboardShortcutFactory(key, this.state, this.textarea));
      return setTimeout(() => {
        this.handleRemoveActiveState(key);
      }, 100);
    }

    if (["CapsLock", "Shift"].includes(key)) {
      if (this.isMobile) {
        if (this.buttonGroups === shifted_mobile_button_groups) {
          this.handleToggleButtonGroups(mobile_button_groups);
          return;
        } else {
          return this.handleToggleButtonGroups(shifted_mobile_button_groups);
        }
      }

      if (this.buttonGroups === shifted_desktop_button_groups) {
        this.handleToggleButtonGroups(desktop_button_groups);
        this.handleRemoveActiveState(key);
        return this.handleRemoveActiveState("CapsLock");
      } else {
        this.handleToggleButtonGroups(shifted_desktop_button_groups);
        return this.handleAddActiveState(key);
      }
    }

    const updatedState = TaskMaster(
      key,
      this.state,
      this.textarea,
      this.handleAddActiveState.bind(this)
    );
    this.updateState(updatedState);
    this.handleAddActiveState(key);
  }

  handlePaste(event, pastedTextFromKeyboard) {
    event && event.preventDefault();
    const pastedText =
      (event && event.clipboardData && event.clipboardData.getData("text")) ||
      pastedTextFromKeyboard;
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

  handleClick(event) {
    const key = event.target.value;
    if (key === "toggle_numbers") {
      return this.handleToggleButtonGroups(shifted_mobile_button_groups);
    }
    if (key === "toggle_letters") {
      return this.handleToggleButtonGroups(mobile_button_groups);
    }
    if (key === "information") {
      return this.openDialog();
    }

    if (key === "audio") {
      return this.speakText();
    }

    if (["Shift", "meta"].includes(key)) {
      return;
    }

    if (["CapsLock"].includes(key)) {
      if (this.buttonGroups === shifted_desktop_button_groups) {
        this.handleToggleButtonGroups(desktop_button_groups);
        this.handleRemoveActiveState(key);
        return;
      }

      this.handleToggleButtonGroups(shifted_desktop_button_groups);
      this.handleAddActiveState(key);
      return;
    }

    this.updateState(ClickFactory(key, this.state, this.textarea));
  }

  speakText() {
    let textToRead = this.state.selectedText
      ? this.state.selectedText
      : this.state.textValue;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "ar-SA";

    speechSynthesis.speak(utterance);
  }

  getShiftedValue(button) {
    if (this.showShiftedValue === 'true') {
      return html`<p class="button_shifted">${button.shifted}</p>`;
    }

    return null;
  }

  getEnglishValue(button) {
    if (this.showEnglishValue === 'true') {
      return html`<p class="button_en">${button.label}</p>`;
    }

    return null;
  }

  getTextAreaValue() {
    return this.state.textValue;
  }

  resetValue() {
    this.updateState({ 
      textValue: "",
      historyIndex: 0,
      history: [],
      selectedText: "",
      copiedText: "",
      cursorPosition: 0,
  });
  }
  render() {
    return html`
      <section class="keyboard_wrapper">
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
                ${buttons.map((button) => {
                  const cryptedClass = crypt("salt", button.en);
                  return html`
                  <button
                    value="${button.en}"
                    type="button"
                    class="button button_${cryptedClass} ${button.modifierClass}"
                    title="${button.title}"
                    aria-label="${button.title}"
                    @click="${this.handleClick}"
                  >
                  ${this.getShiftedValue(button)}
                  ${this.getEnglishValue(button)}
                  <p class="button_value">${button.ar}</p>
                </button>
              </div>`;
                })}
              </div>
            `;
          })}
        </div>
      </section>
    `;
  }
}

customElements.define("arabic-keyboard", ArabicKeyboard);
