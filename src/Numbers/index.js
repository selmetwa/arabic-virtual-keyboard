import { deleteSelectedText } from '../Backspace/backspace_helpers';
import { numberFactory } from './numbers_helpers';

export const NumbersFactory = (key, state) => {
  console.log({ state })
  const _selectedText = state.selectedText;
  const _cursorPosition = state.cursorPosition;
  let _textValue = state.textValue;

  if (!!_selectedText) {
    _textValue = deleteSelectedText(_textValue, _selectedText);
  }

  const { newText, newCursorPosition } = numberFactory(key, _textValue, _cursorPosition);
  return {
    textValue: newText,
    cursorPosition: newCursorPosition,
    previousKey: key,
  };
}