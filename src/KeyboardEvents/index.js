import * as Types from '../constants/types.js'
import { deleteSelectedText, isRightArrow, isLeftArrow } from '../utils.js/index.js'
import { PasteFactory } from '../Paste/index.js'

/**
 * asd
 * @param {string} key 
 * @param {Types.state} state 
 * @param {Element} textarea 
 */
export const KeyboardShortcutFactory = (key, state, textarea) => {
  switch (key) {
    case 'a': // select all
      textarea.select()
      return {}
    case 'c': // copy
      return { copiedText: state.selectedText }
    case 'v': // paste
      return PasteFactory(state.copiedText, state)
    case 'x': // cut
      const res = deleteSelectedText(state.textValue, state.selectedText);

      return {
        textValue: res,
        cursorPosition: res.length,
        copiedText: state.selectedText,
        history: [...state.history, state.textValue],
        historyIndex: state.historyIndex + 1,
        selectedText: ''
      };
    case 'z': // undo
      if (state.history.length === 0) {
        return state;
      }

      const textValue = state.history[state.historyIndex];
      const historyIndex = state.historyIndex - 1;
      const newHistory = state.history.slice(0, state.historyIndex);

      return {
        textValue,
        historyIndex,
        cursorPosition: textValue.length,
        history: newHistory
      }
  }
}

/**
 * Updates cursor position based on left and right arrow keys
 * @param {string} key - key that was pressed
 * @param {Types.State} state - current state of the keyboard
 * @param {Element} textarea 
 * @returns {Types.State}
 */
export const KeyboardNavigationFactory = (key, state, textarea) => {
  if (isLeftArrow(key) && state.cursorPosition < state.textValue.length) {
    textarea.setSelectionRange(state.cursorPosition + 1, state.cursorPosition + 1)
    return { cursorPosition: state.cursorPosition + 1, previousKey: key, selectedText: '' };
  }

  if (isRightArrow(key) && state.cursorPosition > 0) {
    textarea.setSelectionRange(state.cursorPosition - 1, state.cursorPosition - 1)
    return { cursorPosition: state.cursorPosition - 1, previousKey: key, selectedText: '' };
  }

  textarea.setSelectionRange(state.cursorPosition, state.cursorPosition)

  return {
    cursorPosition: state.cursorPosition,
    previousKey: key,
    selectedText: ''
  }
}