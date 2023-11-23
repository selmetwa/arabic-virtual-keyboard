import * as Types from '../constants/types.js'
import { numbers } from "../constants/data.js";
import { deleteSelectedText } from '../utils.js';

/**
 * Finds corresponding arabic number for english number, inserts it into text and returns new text and cursor position
 * @param {string} englishNumber 
 * @param {string} originalText 
 * @param {number} cursorPosition 
 */
export const numberFactory = (englishNumber, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const numberObject = numbers.find((obj) => obj.en === englishNumber);
  const arabicNumber = numberObject && numberObject.ar;

  if (!arabicNumber) {
    return {
      newText: originalText,
      newCursorPosition: cursorPosition
    }
  }

  originalArray.splice(cursorPosition, 0, arabicNumber);
  const newText = originalArray.join('');
  const newCursorPosition = cursorPosition + 1;

  return { newText, newCursorPosition };
};

/**
 * @param {string} char - key pressed 
 * @param {Types.State} state - current state of the keyboard
 */
export const NumbersFactory = (key, state) => {
  const _selectedText = state.selectedText;
  const _cursorPosition = state.cursorPosition;
  let _textValue = state.textValue;

  if (!!_selectedText) {
    _textValue = deleteSelectedText(_textValue, _selectedText);
  }

  const { newText, newCursorPosition } = numberFactory(key, _textValue, _cursorPosition);

  const newHistory = [...state.history, _textValue]

  return {
    textValue: newText,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    previousTextValue: state.textValue,
    cursorPosition: newCursorPosition,
    previousKey: key,
    selectedText: '',
  };
}