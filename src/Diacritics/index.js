import { deleteSelectedText, getArabicDiacriticMark } from '../utils.js';

export const insertDiacriticMarkIntoArabic = (key, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const arabicDiacriticMark = getArabicDiacriticMark(key);
  originalArray.splice(cursorPosition, 0, arabicDiacriticMark);

  const newText = originalArray.join('');
  const newCursorPosition = cursorPosition + 1;

  return { newText, newCursorPosition };
}

export const DiacriticsFactory = (key, state) => {
  let _textValue = state.textValue;

  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }

  const { newText, newCursorPosition } = insertDiacriticMarkIntoArabic(key, _textValue, state.cursorPosition);

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