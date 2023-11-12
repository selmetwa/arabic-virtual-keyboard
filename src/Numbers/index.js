import { numbers } from "../constants/data.js";
import { deleteSelectedText } from '../Backspace/index.js';

export const numberFactory = (englishNumber, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const numberObject = numbers.find((obj) => obj.en === englishNumber);
  const arabicNumber = numberObject && numberObject.ar;

  originalArray.splice(cursorPosition, 0, arabicNumber);

  const newText = originalArray.join('');
  const newCursorPosition = cursorPosition + 1;

  return { newText, newCursorPosition };
};

export const NumbersFactory = (key, state) => {
  const _selectedText = state.selectedText;
  const _cursorPosition = state.cursorPosition;
  let _textValue = state.textValue;

  if (!!_selectedText) {
    _textValue = deleteSelectedText(_textValue, _selectedText);
  }

  const { newText, newCursorPosition } = numberFactory(key, _textValue, _cursorPosition);

  return {
    textValue: newText,
    cursorPosition: newText.length,
    previousKey: key,
    selectedText: '',
  };
}