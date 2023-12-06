import { deleteSelectedText } from '../utils/index.js';
import { letters, englishLetters, punctuation, numbers, diacritics } from "../constants/data.js"
import { BackspaceFactory } from '../Factories/Backspace/index.js';
import { TabFactory } from '../Factories/Tab/index.js';
import { EnterFactory } from '../Factories/Enter/index.js';
import { SpaceFactory } from '../Factories/Space/index.js';

const allKeys = [].concat(letters, punctuation, numbers, diacritics)

export const insertIntoText = (key, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const button = allKeys.find(button => button.en === key)
  console.log({ button })
  const arabic = button.ar

  originalArray.splice(cursorPosition, 0, arabic);
  const newText = originalArray.join('');
  const newCursorPosition = cursorPosition + 1;

  return { newText, newCursorPosition };
};

export const ClickFactory = (key, state, textarea) => {
  console.log({ key, state, allKeys })
  let _textValue = state.textValue;

  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }

  if (key === 'Backspace') {
    return BackspaceFactory(key, state)
  }

  if (key === 'Tab') {
    return TabFactory(state)
  }

  if (key === 'Enter') {
    return EnterFactory(state, textarea)
  }
  const { newText, newCursorPosition } = insertIntoText(key, _textValue, state.cursorPosition);
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