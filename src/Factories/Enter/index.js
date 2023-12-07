import * as Types from '../../constants/types.js'
import { deleteSelectedText } from "../../utils";

/**
 * Break text to new line
 * @param {Types.State} state - current state of the keyboard
 * @param {Element} textarea
 * @returns {Types.State} - new state of the keyboard
 */
export const EnterFactory = (state, textarea) => {
  let _textValue = state.textValue;

  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }

  const arr = _textValue.split('');
  arr.splice(state.cursorPosition, 0, '\n');

  const newHistory = [...state.history, state.textValue]
  textarea.setSelectionRange(state.cursorPosition + 1, state.cursorPosition + 1);

  return {
    textValue: arr.join(''),
    cursorPosition: state.cursorPosition + 1,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    selectedText: "",
  };
}