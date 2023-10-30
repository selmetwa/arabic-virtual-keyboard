import { LitElement, html, css } from 'lit';
import { button_groups } from './constants/button_groups.js';
import { numberFactory, isNumber } from './helpers/number.js';
import { deleteFromTextInput, deleteSelectedText } from './helpers/delete.js';
import './button-group.js';

class ArabicKeyboard extends LitElement {
  static get properties() {
    return {
      textValue: { type: String },
      selectedText: { type: String },
    };
  }

  constructor() {
    super();
    this.buttonGroups = button_groups;
    this.textValue = '';
  }

  static styles = css `
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

      .textarea {
        width: 100%;
        direction: rtl;
        resize: none;
        text-align: right;
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
  `;

  getCursorPositionInRTL(textarea) {
    const cursorPosition = textarea.value.length - textarea.selectionStart;
    return cursorPosition;
  }

  handleKeyChange(event) {
    const inputType = event.inputType;

    // Handle Delete
    if (inputType === 'deleteContentBackward') {
      if (!!this.selectedText) {
        const newTextValue = deleteSelectedText(this.textValue, this.selectedText)
        this.selectedText = '';
        return this.textValue = newTextValue;
      }

      const textarea = this.shadowRoot.querySelector('textarea');
      // const cursorPosition = this.getCursorPositionInRTL(textarea);
      const cursorPosition = textarea.selectionStart;

      if (cursorPosition < this.textValue.length - 1) {
        const valueBeforeCursor = this.textValue.substring(0, cursorPosition);
        const valueAfterCursor = this.textValue.substring(cursorPosition + 1);
        const a = deleteFromTextInput(valueAfterCursor)
        console.log({valueBeforeCursor, valueAfterCursor, cursorPosition, a})
        this.textValue = valueBeforeCursor + a;
        textarea.selectionStart = cursorPosition;
        textarea.selectionEnd = cursorPosition;
      }
    }

    // Handle Insertion
    if (inputType === 'insertText') {
      const eventData = event.data;

      if (isNumber(eventData)) {
        const arabicNumber = numberFactory(eventData)
        this.textValue = this.textValue += arabicNumber;
      }
    }
  }

  handleClick(event) {
    const eventObject = event.target.value;
    const buttonType = eventObject && eventObject.split('_')[0];
    const buttonValue = eventObject && eventObject.split('_')[1];

    if (buttonType === 'number') {
      const arabicNumber = numberFactory(buttonValue)
      this.textValue = this.textValue += arabicNumber;
    }
  }

  updateSelectedText() {
    const textarea = this.shadowRoot.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start !== end) {
      this.selectedText = textarea.value.substring(start, end);
    } else {
      this.selectedText = '';
    }
  }

  render() {
      return html `
      <section class="wrapper">
        <textarea 
          class="textarea"
          rows="5"
          cols="10"
          @input=${this.handleKeyChange}
          @select="${this.updateSelectedText}"
          .value=${this.textValue}
        >
        ${this.textValue}
        </textarea>
        <div class="keyboard">
          ${this.buttonGroups.map((buttonGroup) => {
            const { buttons, type } = buttonGroup;
            return (
              html`
                <button-group 
                  .buttons=${buttons} 
                  .buttonType=${type} 
                  .handleClick=${this.handleClick}
                  .handleKeyChange=${this.handleKeyChange}
                >
                </button-group>
              `
            )
          })}
          <button class="space">Space</button>
        </div>
      </section>
    `;
  }
}

customElements.define('arabic-keyboard', ArabicKeyboard);