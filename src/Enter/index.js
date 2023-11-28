import * as Types from '../constants/types.js'
import { deleteSelectedText } from "../utils.js";

/**
 * Break text to new line
 * @param {Types.State} state - current state of the keyboard
 */
export const EnterFactory = (state) => {
  let _textValue = state.textValue;

  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }

  const arr = _textValue.split('');
  arr.splice(state.cursorPosition, 0, '\n');

  const newHistory = [...state.history, state.textValue]
  return {
    textValue: arr.join(''),
    cursorPosition: state.cursorPosition + 1,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    selectedText: "",
  };
}