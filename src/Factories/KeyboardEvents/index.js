import * as Types from '../../constants/types.js'
import {
  deleteSelectedText,
  isRightArrow,
  isLeftArrow,
  isUpArrow,
  isDownArrow
} from '../../utils/index.js'
import { PasteFactory } from '../Paste/index.js'
import { getNextLineStart, getLineStart, generateRowIndices, getCurrentRow } from './helpers/index.js'

/**
 * Handle keyboard shortcuts after pressing meta key
 * @param {string} key 
 * @param {Types.state} state 
 * @param {Element} textarea 
 */
export const KeyboardShortcutFactory = (key, state, textarea) => {
  const currentLineStart = getLineStart(state.cursorPosition, state.textValue);

  switch (key) {
    case 'a': // select all
      textarea.select()
      return {}
    case 'c': // copy
      document.execCommand('copy');
      return { copiedText: state.selectedText }
    case 'v': // paste
      return PasteFactory(state.copiedText, state)
    case 'x': // cut
      document.execCommand('copy');
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

    case 'ArrowLeft':
      const rows = state.textValue.split('\n');
      const currentRowIndex = getCurrentRow(state.textValue, state.cursorPosition) - 1;
      const currentLineEnd = currentLineStart + rows[currentRowIndex].length;
      textarea.setSelectionRange(currentLineEnd, currentLineEnd)
      return { cursorPosition: currentLineEnd, selectedText: '' }
    case 'ArrowRight':
      textarea.setSelectionRange(currentLineStart, currentLineStart)
      return { cursorPosition: currentLineStart, selectedText: '' }
    case 'ArrowUp':
      textarea.setSelectionRange(0, 0)
      return { cursorPosition: 0, selectedText: '' }
    case 'ArrowDown':
      textarea.setSelectionRange(state.textValue.length, state.textValue.length)
      return { cursorPosition: state.textValue.length, selectedText: '' }
  }
}

/**
 * Updates cursor position based on left,right,down,up arrow keys
 * @param {string} key - key that was pressed
 * @param {Types.State} state - current state of the keyboard
 * @param {Element} textarea 
 * @returns {Types.State}
 */
export const KeyboardNavigationFactory = (key, state, textarea) => {
  if (isLeftArrow(key) && state.cursorPosition < state.textValue.length) {
    textarea.setSelectionRange(state.cursorPosition + 1, state.cursorPosition + 1)
    return { cursorPosition: state.cursorPosition + 1, selectedText: '' };
  }

  if (isRightArrow(key) && state.cursorPosition > 0) {
    textarea.setSelectionRange(state.cursorPosition - 1, state.cursorPosition - 1)
    return { cursorPosition: state.cursorPosition - 1, selectedText: '' };
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
      return { cursorPosition: newCursorPosition, selectedText: '' };
    }

    textarea.setSelectionRange(currentLineStart - 1, currentLineStart - 1)
    return { cursorPosition: currentLineStart - 1, selectedText: '' }
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

    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    return { cursorPosition: newCursorPosition, selectedText: '' };
  }

  textarea.setSelectionRange(state.cursorPosition, state.cursorPosition)

  return {
    cursorPosition: state.cursorPosition,
    selectedText: ''
  }
}