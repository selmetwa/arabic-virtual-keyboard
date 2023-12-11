import { deleteSelectedText } from '../utils/index.js';
import { letters, punctuation, numbers, diacritics, specialCharacters } from "../constants/data.js"
import { BackspaceFactory } from '../Factories/Backspace/index.js';
import { TabFactory } from '../Factories/Tab/index.js';
import { EnterFactory } from '../Factories/Enter/index.js';
import { SpaceFactory } from '../Factories/Space/index.js';

const allKeys = [].concat(letters, punctuation, numbers, diacritics, specialCharacters)

/**
 * @param {string} key 
 * @param {string} originalText 
 * @param {number} cursorPosition 
 * @returns {object} - new text and cursor position
 */
export const insertIntoText = (key, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const button = allKeys.find(button => button.en === key)
  const arabic = button.ar

  originalArray.splice(cursorPosition, 0, arabic);
  const newText = originalArray.join('');
  const newCursorPosition = cursorPosition + 1;

  return { newText, newCursorPosition };
};

/**
 * Handles clicks on buttons
 * @param {string} key - Key pressed
 * @param {Types.State} state - current state of the keyboard
 * @param {HTMLTextAreaElement} textarea - textarea element
 * @returns {Types.State} - new state of the keyboard
 */
export const ClickFactory = (key, state, textarea) => {
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

  if (key === 'space') {
    return SpaceFactory(state)
  }

  const { newText, newCursorPosition } = insertIntoText(key, _textValue, state.cursorPosition);
  const newHistory = [...state.history, state.textValue]

  return {
    textValue: newText,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    cursorPosition: newCursorPosition,
    selectedText: '',
  };
}