import { isRightArrow, isLeftArrow } from './keyboard_navigation_helpers';

/**
 * @param {string} key 
 */
export const KeyboardNavigationFactory = (key, state) => {
  const _cursorPosition = state.cursorPosition;
  const _textValueLength = state.textValue.length;

  if (isLeftArrow(key) && _cursorPosition < _textValueLength) {
    return { cursorPosition: _cursorPosition + 1, previousKey: key };
  }

  if (isRightArrow(key) && _cursorPosition > 0) {
    return { cursorPosition: _cursorPosition - 1, previousKey: key };
  }

  return {
    cursorPosition: _cursorPosition,
    previousKey: key
  }
}