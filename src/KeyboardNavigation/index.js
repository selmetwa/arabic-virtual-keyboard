import * as Types from '../constants/types'
import { isRightArrow, isLeftArrow } from '../utils.js';

/**
 * 
 * @param {string} key - key that was pressed
 * @param {Types.State} state - current state of the keyboard
 * @returns {Types.State}
 */
export const KeyboardNavigationFactory = (key, state) => {
  const _cursorPosition = state.cursorPosition;
  const _textValueLength = state.textValue.length;

  if (isLeftArrow(key) && _cursorPosition < _textValueLength) {
    return { cursorPosition: _cursorPosition + 1, previousKey: key, selectedText: '' };
  }

  if (isRightArrow(key) && _cursorPosition > 0) {
    return { cursorPosition: _cursorPosition - 1, previousKey: key, selectedText: '' };
  }

  return {
    cursorPosition: _cursorPosition,
    previousKey: key,
    selectedText: ''
  }
}