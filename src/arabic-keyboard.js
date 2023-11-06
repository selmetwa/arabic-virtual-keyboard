import { LitElement, html, css } from "lit";

import { button_groups } from "./constants/button_groups.js";
import { numberFactory, isNumber } from "./helpers/number.js";
import { handleDeleteText, deleteSelectedText } from "./helpers/delete.js";
import { getSelectedText } from "./helpers/getSelectedText.js";
import { isLetter, letterFactory, specialLetterFactory } from "./helpers/letter.js";

class ArabicKeyboard extends LitElement {
  static get properties() {
    return {
      textValue: { type: String },
      selectedText: { type: String },
    };
  }

  constructor() {
    super();
    this.textarea = null;
    this.buttonGroups = button_groups;
    this.textValue = "";
    this.selectedText = "";
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

  /**
   * @description Updates the state of the component.
   * @param {{
   *  selectedText: string,
   *  textValue: string,
   *  cursorPosition: number
   * }} object - Object containing updated values.
   */
  updateState(object) {
    const { textValue, selectedText, cursorPosition } = object;

    if (typeof textValue === "string") {
      this.textValue = textValue;
    }

    if (typeof selectedText === "string") {
      this.selectedText = selectedText;
    }

    if (typeof cursorPosition === "number") {
      this.textarea.setSelectionRange(cursorPosition, cursorPosition);
    }
  }

  handleKeyChange(event) {
    const inputType = event.inputType;

    // Handle Delete
    if (inputType === "deleteContentBackward") {
      if (!!this.selectedText) {
        return this.updateState({ 
          textValue: deleteSelectedText(this.textValue, this.selectedText),
          selectedText: "",
        });
      }

      const { newText, cursorPosition } = handleDeleteText(this.textarea);
      return this.updateState({
        textValue: newText,
        cursorPosition,
      });
    }

    // Handle Insertion
    if (inputType === "insertText") {
      const inputCharacter = event.data;

      if (isNumber(inputCharacter)) {
        return this.updateState({ 
          textValue: this.textValue += numberFactory(inputCharacter),
        });
      }

      if (isLetter(inputCharacter)) {
        // Handle Letters with no 1-1 english equivalent
        if (inputCharacter === "'") {
          return this.updateState({
            textValue: specialLetterFactory(this.textValue),
          });
        }

        return this.updateState({
          textValue: this.textValue += letterFactory(inputCharacter),
        });
      }
    }
  }

  handleClick(event) {
    const eventObject = event.target.value;
    const buttonType = eventObject && eventObject.split("_")[0];
    const buttonValue = eventObject && eventObject.split("_")[1];

    if (buttonType === "number") {
      this.updateState({
        textValue: this.textValue += numberFactory(buttonValue),
      })
    }

    if (buttonType === "alphabet") {
      this.updateState({
        textValue: this.textValue += letterFactory(buttonValue),
      })
    }
  }

  updateSelectedText() {
    return this.updateState({ selectedText: getSelectedText(this.textarea) });
  }

  render() {
    return html`
      <section class="wrapper">
        <textarea
          class="textarea"
          rows="5"
          cols="10"
          @input=${this.handleKeyChange}
          @select="${this.updateSelectedText}"
          .value=${this.textValue}
        >
        </textarea>
        <div class="keyboard">
          ${this.buttonGroups.map((buttonGroup) => {
            const { buttons, type } = buttonGroup;
            return html`
              <h3>${type}</h3>
              <div class="button_group ${type === "number" ? "ltr" : "rtl"}">
                ${buttons.map(
                  (button) =>
                    html`
                      <div class="button_wrapper">
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
                      </div>
                    `
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
