import { deleteSelectedText, convertLetterToArabic } from '../../utils';

/**
 * Finds corresponding arabic number for english number, inserts it into text and returns new text and cursor position
 * @param {string} englishLetter 
 * @param {string} originalText 
 * @param {number} cursorPosition 
 * @returns {object} - new text and cursor position
 */
export const insertEnglishLetterIntoArabic = (englishLetter, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const arabicLetter = convertLetterToArabic(englishLetter);

  originalArray.splice(cursorPosition, 0, arabicLetter);
  const newText = originalArray.join('');
  const newCursorPosition = cursorPosition + 1;

  return { newText, newCursorPosition };
};

/**
 * @param {string} key - key pressed
 * @param {Types.State} state - current state of the keyboard
 * @returns {Types.State} - new state of the keyboard
 */
export const LettersFactory = (key, state) => {
  let _textValue = state.textValue;

  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }

  const { newText, newCursorPosition } = insertEnglishLetterIntoArabic(key, _textValue, state.cursorPosition);

  const newHistory = [...state.history, state.textValue]

  return {
    textValue: newText,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    cursorPosition: newCursorPosition,
    selectedText: '',
  };
}