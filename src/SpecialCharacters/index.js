import { deleteSelectedText, convertNumberToArabic, getArabicPunctuation } from '../utils.js';

const insertSpecialCharacter = (specialCharacter, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const arabicCharacter = getArabicPunctuation(specialCharacter);

  originalArray.splice(cursorPosition, 0, arabicCharacter);
  const newText = originalArray.join('');
  const newCursorPosition = cursorPosition + 1;

  return { newText, newCursorPosition };
}


export const SpecialCharacterFactory = (key, state) => {
  let _textValue = state.textValue;

  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }

  const { newText, newCursorPosition } = insertSpecialCharacter(key, _textValue, state.cursorPosition);

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