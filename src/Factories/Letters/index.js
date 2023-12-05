import { deleteSelectedText, convertLetterToArabic } from '../../utils';

/**
 * Finds corresponding arabic number for english number, inserts it into text and returns new text and cursor position
 * @param {string} englishLetter 
 * @param {string} originalText 
 * @param {number} cursorPosition 
 */
export const insertEnglishLetterIntoArabic = (englishLetter, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const arabicLetter = convertLetterToArabic(englishLetter);

  originalArray.splice(cursorPosition, 0, arabicLetter);
  const newText = originalArray.join('');
  const newCursorPosition = cursorPosition + 1;

  return { newText, newCursorPosition };
};

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
    previousKey: key,
    selectedText: '',
  };
}