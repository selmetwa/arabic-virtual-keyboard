import * as Types from '../../constants/types.js'
import { deleteSelectedText, convertNumberToArabic } from '../../utils';

/**
 * Finds corresponding arabic number for english number, inserts it into text and returns new text and cursor position
 * @param {string} englishNumber 
 * @param {string} originalText 
 * @param {number} cursorPosition 
 */
export const insertEnglishNumberIntoArabic = (englishNumber, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const arabicNumber = convertNumberToArabic(englishNumber);

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
 * @param {string} key - key pressed 
 * @param {Types.State} state - current state of the keyboard
 */
export const NumbersFactory = (key, state) => {
  let _textValue = state.textValue;

  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }

  const { newText, newCursorPosition } = insertEnglishNumberIntoArabic(key, _textValue, state.cursorPosition);
  const newHistory = [...state.history, state.textValue]

  return {
    textValue: newText,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    cursorPosition: newCursorPosition,
    selectedText: '',
  };
}