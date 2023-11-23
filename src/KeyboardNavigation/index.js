import * as Types from '../constants/types'
import { isRightArrow, isLeftArrow } from '../utils.js';

/**
 * 
 * @param {string} key - key that was pressed
 * @param {Types.State} state - current state of the keyboard
 * @returns {Types.State}
 */
export const KeyboardNavigationFactory = (key, state) => {
  if (isLeftArrow(key) && state.cursorPosition < state.textValue.length) {
    return { cursorPosition: state.cursorPosition + 1, previousKey: key, selectedText: '' };
  }

  if (isRightArrow(key) && state.cursorPosition > 0) {
    return { cursorPosition: state.cursorPosition - 1, previousKey: key, selectedText: '' };
  }

  return {
    cursorPosition: state.cursorPosition,
    previousKey: key,
    selectedText: ''
  }
}