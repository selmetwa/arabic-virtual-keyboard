import { deleteSelectedText, getArabicPunctuation } from '../../utils';

const insertPunctuation = (specialCharacter, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const arabicCharacter = getArabicPunctuation(specialCharacter);

  originalArray.splice(cursorPosition, 0, arabicCharacter);
  const newText = originalArray.join('');
  const newCursorPosition = cursorPosition + 1;

  return { newText, newCursorPosition };
}


export const PunctuationFactory = (key, state) => {
  let _textValue = state.textValue;

  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }

  const { newText, newCursorPosition } = insertPunctuation(key, _textValue, state.cursorPosition);

  const newHistory = [...state.history, state.textValue]

  return {
    textValue: newText,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    cursorPosition: newCursorPosition,
    selectedText: '',
  };
}