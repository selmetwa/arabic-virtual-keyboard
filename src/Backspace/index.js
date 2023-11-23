import { deleteSelectedText } from "../utils.js";

/**
 * Function to delete one character from text based on the cursor position.
 * @param {number} cursorPosition 
 * @param {string} textValue 
 */
export const handleDeleteText = (cursorPosition, textValue) => {
  const arr = textValue && textValue.split('') || [];
  arr.splice(cursorPosition - 1, 1);

  return {
    newCursorPosition: cursorPosition - 1,
    newText: arr.join('')
  };
}

/**
 * @param {string} key - Key pressed
 * @param {Types.State} state - current state of the keyboard
 */
export const BackspaceFactory = (key, state) => {
  const _selectedText = state.selectedText;
  const _cursorPosition = state.cursorPosition;
  let _textValue = state.textValue;

  if (_textValue.length === 0) return state;

  if (!!_selectedText) {
    return {
      textValue: deleteSelectedText(_textValue, _selectedText),
      selectedText: "",
    };
  }

  const { newText, newCursorPosition } = handleDeleteText(_cursorPosition, _textValue);
  const newHistory = [...state.history, _textValue]
  return {
    textValue: newText,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    cursorPosition: newCursorPosition >= 0 ? newCursorPosition : 0,
    previousKey: key,
    selectedText: "",
  };
}