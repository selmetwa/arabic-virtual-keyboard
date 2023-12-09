import { LitElement, html, css } from "lit";

import * as Types from "./constants/types.js";
import { button_groups, shifted_button_groups } from "./constants/button_groups.js";
import { crypt, checkPreviousLetter } from "./utils/index.js";
import { MouseCutFactory, UpdateSelectedTextFactory, TextareaClickFactory } from "./Factories/MouseEvents/index.js";
import { PasteFactory } from "./Factories/Paste/index.js";
import { KeyboardShortcutFactory } from "./Factories/KeyboardEvents/index.js";
import { TaskMaster } from "./Factories/index.js";
import { ClickFactory } from './Click/index.js';

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
      --keyboard-width: 800px;
      --main-width: 100%;
      --row-height: 50px;
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
      position: relative;
      margin: 0;
      padding: 0;
    }

    .keyboard_wrapper {
      margin: auto;
      max-width: var(--keyboard-width);
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-family: 'Arial', sans-serif; /* Change to a font that supports Arabic characters well */
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
    }

    .keyboard_row {
      display: grid;
      gap: var(--gap);
      width: 100%;
      height: var(--row-height);
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
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    .keyboard_row.fifth_row {
      grid-template-columns: 2fr 10fr 1fr 1fr;
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
      background-color: var(--active-background-color)!important;
      border: var(--active-border)!important;
    }
    .button {
      font-size: var(--font-size);
      border-radius: var(--border-radius);
      background-color: var(--background-color);
      border: var(--border);
      height: var(--width);
      height: 100%;
      padding: 0;
    }

    .button:hover {
      background-color: var(--hover-background-color);
      border: var(--active-border);
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

    .diacritic .button_value {
      font-size: 40px;
      position: absolute;
      top: 0;
      right: 20px;
    }
    .diacritic .button_en {
      font-size: 14px!important;
    }

    .dialog {
      width: var(--keyboard-width);
      z-index: 1;
      height: 100%;
      margin-left: 0;
      border: 1px solid #000;
      background-color: #000;
      color: #fff;
    }
    .dialog_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dialog p {
      font-size: 18px;
    }

    .dialog_letter_en {
      color: #00B4D8;
      font-weight: bold;
    }
    .dialog_letter_ar {
      color: red;
      font-weight: bold;
    }
    .dialog .dialog_mark {
      font-size: 40px;
      color: red;
    }
  `;

  firstUpdated() {
    this.textarea = this.shadowRoot.querySelector("textarea");
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
    })
  }

  handleRemoveActiveState(key) {
    const cryptedClassname = crypt("salt", key);
    const target = `.button_${cryptedClassname}`;
    const keysPressed = this.shadowRoot.querySelectorAll(target);
    const nodes = Array.from(keysPressed);

    nodes.forEach((node) => {
      node && node.classList.remove("active");
    })
  }

  removeSpecialCharacterActiveState() {
    const keys = ['-', 'y--', 'w--', 'a--', 'Y--', 'W--', 'A--'];
    keys.forEach((key) => {
      const cryptedClassname = crypt("salt", key);
      console.log({ cryptedClassname })
      const target = `.button_${cryptedClassname}`;
      const keysPressed = this.shadowRoot.querySelectorAll(target);
      const nodes = Array.from(keysPressed);

      nodes.forEach((node) => {
        node && node.classList.remove("active");
      })
    })
  }

  removeDiacriticActiveState() {
    const keys = ['=', 'a=', 'an=', 'u=', 'un=', 'i=', 'in=', 'h=', 's=', 'A=', 'AN=', 'U=', 'UN=', 'I=', 'IN=', 'H=', 'S='];
    keys.forEach((key) => {
      const cryptedClassname = crypt("salt", key);
      console.log({ cryptedClassname })
      const target = `.button_${cryptedClassname}`;
      const keysPressed = this.shadowRoot.querySelectorAll(target);
      const nodes = Array.from(keysPressed);

      nodes.forEach((node) => {
        node && node.classList.remove("active");
      })
    })
  }

  handleKeyUp(event) {
    let key;
    if (event.key === "'") {
      const previousLetter = checkPreviousLetter(this.state.textValue, this.state.cursorPosition);
      if (["d'", "g'", "s'", "t'", "h'", "H'"].includes(previousLetter)) {
        this.shadowRoot.querySelector('.button_2d').classList.remove("active");
        key = previousLetter;
      } else {
        key = event.key;
      }
    }
    else if (event.key === "=") {
      return this.removeDiacriticActiveState()
    }
    else if (event.key === "-") {
      return this.removeSpecialCharacterActiveState()
    }
    else if (event.key === "Meta") {
      key = "meta"
    } else if (event.code === "Space") {
      key = "space"
    } else {
      key = event.key;
    }

    this.handleRemoveActiveState(key)

    if (["CapsLock", "Shift"].includes(key)) {
      this.handleToggleButtonGroups(button_groups);
    }
  }

  handleKeyDown(event) {
    event.preventDefault();

    const key = event.code === "Space" ? 'Space' : event.key;

    if (event.metaKey) {
      this.handleAddActiveState("meta");
      this.handleAddActiveState(key);
      this.updateState(KeyboardShortcutFactory(key, this.state, this.textarea));
      return setTimeout(() => {
        this.handleRemoveActiveState(key)
      }, 100)
    }

    if (["CapsLock", "Shift"].includes(key)) {
      if (this.buttonGroups === shifted_button_groups) {
        this.handleToggleButtonGroups(button_groups);
        this.handleRemoveActiveState(key);
        this.handleRemoveActiveState("CapsLock");
        return
      }
    }

    if (["CapsLock", "Shift"].includes(key)) {
      this.handleToggleButtonGroups(shifted_button_groups);
    }

    const updatedState = TaskMaster(key, this.state, this.textarea, this.handleAddActiveState.bind(this));
    this.updateState(updatedState);

    this.handleAddActiveState(key);
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
    event.clipboardData.setData("text/plain", this.state.selectedText.toString());
    this.updateState({ copiedText: this.state.selectedText });
  }

  handleCut(event) {
    event.preventDefault();
    document.execCommand("copy");
    event.clipboardData.setData("text/plain", this.state.selectedText.toString());
    this.updateState(MouseCutFactory(this.state));
  }

  handleClick(event) {
    const key = event.target.value;

    if (key === "information") {
      return this.openDialog()
    }
    if (["Shift", "meta"].includes(key)) {
      return
    }

    if (["CapsLock"].includes(key)) {
      if (this.buttonGroups === shifted_button_groups) {
        this.handleToggleButtonGroups(button_groups);
        this.handleRemoveActiveState(key);
        return
      }

      this.handleToggleButtonGroups(shifted_button_groups);
      this.handleAddActiveState(key);
      return
    }

    this.updateState(ClickFactory(key, this.state, this.textarea))
  }

  openDialog() {
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog.showModal();
  }

  closeDialog() {
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog.close();
  }
  render() {
    return html`
      <noscript>
        <p>Please enable JavaScript to use this application.</p>
      </noscript>
      <main class="wrapper" lang="ar">
      <section class="keyboard_wrapper">
        <dialog class="dialog">
          <header class="dialog_header">
            <h3>Arabic Virtual Keyboard</h3>
            <button @click="${this.closeDialog}" class="button">Close</button>
          </header>
          <p>
            This virtual arabic keyboard is a tool to help native english speakers to type in arabic.
          </p>
          <p>
            Most keys are mapped to their phonetic equivalent in arabic. For example, the letter <span class="dialog_letter_en">b</span> is mapped to the arabic letter <span class="dialog_letter_ar">ب</span>.
            The letter <span class="dialog_letter_en">t</span> is mapped to the arabic letter <span class="dialog_letter_ar">ت</span>. The letter <span class="dialog_letter_en">a</span> is mapped to the arabic letter <span class="dialog_letter_ar">ا</span>.
          </p>
          <p>
            For the emphatic arabic letters you can simply capitalize the closest english letter. For example to get the letter <span class="dialog_letter_ar">ط</span> you can type <span class="dialog_letter_en">T</span>, to get the letter <span class="dialog_letter_ar">ض</span> you can type <span class="dialog_letter_en">D</span>.
          </p>
        </dialog>
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
          return html`<button
                        value="${button.en}"
                        type="button"
                        class="button button_${cryptedClass} ${button.modifierClass}"
                        title="${button.title}"
                        @click="${this.handleClick}"
                      >
                        <p class="button_shifted">${button.shifted}</p>
                        <p class="button_en">${button.label}</p>
                        <p class="button_value">${button.ar}</p>
                      </button>
                    </div>`
        }
      )}
              </div>
            `;
    })}
        </div>
      </section>
        </main>
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
