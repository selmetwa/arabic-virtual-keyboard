import * as Types from '../constants/types.js'
import { deleteSelectedText } from '../utils.js/index.js';
import { getSelectedText } from "../utils.js";

/**
 * Function to update cutting text with the mouse
 * @param {Types.State} state - current state of the keyboard
 * @returns {Types.State} - new state of the keyboard
 */
export const MouseCutFactory = (state) => {
  const selection = state.selectedText;
  let _textValue = state.textValue;
  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }
  return {
    copiedText: selection,
    textValue: _textValue,
    cursorPosition: state.cursorPosition - selection.length,
    selectedText: "",
  };
}

/**
 * Function to update selected text
 * @param {Event} event
 * @returns {Types.State} - new state of the keyboard
 */
export const UpdateSelectedTextFactory = (event) => {
  const target = event.target;
  const selectedText = getSelectedText(target);
  return {
    cursorPosition: target.selectionStart,
    selectedText: selectedText,
  };
}

/**
 * Function to handle when a user clicks on the textarea
 * @param {Event} event
 * @returns {Types.State} - new state of the keyboard
 */
export const TextareaClickFactory = (event) => {
  console.log({ event })
  const target = event.target;

  return {
    cursorPosition: event.target.selectionStart,
    selectedText: getSelectedText(target),
  };
}