import * as Types from '../../constants/types.js'
import { deleteSelectedText } from "../../utils";

/**
 * Add space to text
 * @param {Types.State} state - current state of the keyboard
 */
export const SpaceFactory = (state) => {
  let _textValue = state.textValue;

  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }

  const arr = _textValue.split('');
  arr.splice(state.cursorPosition, 0, ' ');

  const newHistory = [...state.history, state.textValue]
  return {
    textValue: arr.join(''),
    cursorPosition: state.cursorPosition + 1,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    selectedText: "",
  };
}