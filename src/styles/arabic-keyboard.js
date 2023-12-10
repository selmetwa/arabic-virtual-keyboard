import { css } from "lit";

export const keyboardStyles = css `
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
    --hover-background-color: #e0e0e0;
  }

  .keyboard_wrapper {
    max-width: var(--keyboard-width);
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
    font-family: "Arial", sans-serif;
    /* Change to a font that supports Arabic characters well */
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
    background-color: var(--active-background-color) !important;
    border: var(--active-border) !important;
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
    font-size: 14px !important;
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
    color: #00b4d8;
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