import * as Types from '../constants/types.js'
import {
  deleteSelectedText,
  isRightArrow,
  isLeftArrow,
  isUpArrow,
  isDownArrow
} from '../utils.js/index.js'
import { PasteFactory } from '../Paste/index.js'
import { EnterFactory } from '../Enter/index.js';

import { getNextLineStart, getLineStart, generateRowIndices, getCurrentRow } from './helpers/index.js'

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

  if (isUpArrow(key)) {
    const rows = state.textValue.split('\n');
    const currentRowIndex = getCurrentRow(state.textValue, state.cursorPosition) - 1;
    const previousRowIndex = currentRowIndex > 0 ? currentRowIndex - 1 : 0;
    const previousRowLength = rows[previousRowIndex].length;
    const currentLineStart = getLineStart(state.cursorPosition, state.textValue);
    const previousLineStart = getLineStart(currentLineStart - 1, state.textValue);
    const previousLineEnd = previousLineStart + previousRowLength;

    const positionInCurrentRow = state.cursorPosition - currentLineStart;
    const previousRowIndices = generateRowIndices(previousLineStart, previousLineEnd);
    const newCursorPosition = previousRowIndices[(previousRowIndices.length - 1) - positionInCurrentRow];

    if (newCursorPosition !== undefined) {
      textarea.setSelectionRange(newCursorPosition, newCursorPosition)
      return { cursorPosition: newCursorPosition, previousKey: key, selectedText: '' };
    }

    textarea.setSelectionRange(currentLineStart - 1, currentLineStart - 1)
    return { cursorPosition: currentLineStart - 1, previousKey: key, selectedText: '' }
  }

  if (isDownArrow(key)) {
    const rows = state.textValue.split('\n');
    const currentRowIndex = getCurrentRow(state.textValue, state.cursorPosition) - 1;
    const nextRowIndex = currentRowIndex + 1;
    const nextRowLength = rows[nextRowIndex] ? rows[nextRowIndex].length : 0;
    const currentLineStart = getLineStart(state.cursorPosition, state.textValue);
    const currentLineEnd = currentLineStart + rows[currentRowIndex].length;
    const nextLineStart = getNextLineStart(state.cursorPosition, state.textValue);
    const nextLineEnd = nextLineStart + nextRowLength;

    const positionInCurrentRow = state.cursorPosition - currentLineStart;

    const currentRowIndices = generateRowIndices(currentLineStart, currentLineEnd);
    const indexOfPositionInCurrentRow = currentRowIndices[(currentRowIndices.length - 1) - positionInCurrentRow]
    const nextRowIndices = generateRowIndices(nextLineStart, nextLineEnd);
    const newCursorPosition = nextRowIndices[(nextRowIndices.length - 1) - indexOfPositionInCurrentRow] || nextLineEnd;
    const nextRowExists = nextRowIndex < rows.length;

    if (!nextRowExists) {
      return EnterFactory(state, textarea);
    }

    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    return { cursorPosition: newCursorPosition, previousKey: key, selectedText: '' };
  }

  textarea.setSelectionRange(state.cursorPosition, state.cursorPosition)

  return {
    cursorPosition: state.cursorPosition,
    previousKey: key,
    selectedText: ''
  }
}