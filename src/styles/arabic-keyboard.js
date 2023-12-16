import { css } from "lit";

export const keyboardStyles = css `
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