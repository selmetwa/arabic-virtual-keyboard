import { deleteSelectedText } from "../Backspace/index.js";
import { isNumber } from '../utils.js'
import { numberFactory } from '../Numbers/index.js'

export const PasteFactory = (event, state) => {
  const pastedText = (event.clipboardData).getData("text");
  const _selectedText = state.selectedText;

  let _cursorPosition = state.cursorPosition;
  let _textValue = state.textValue;

  if (!!_selectedText) {
    _textValue = deleteSelectedText(_textValue, _selectedText)
  }

  let outputText = ''

  for (let i = 0; i < pastedText.length; i++) {
    const char = pastedText[i];
    if (isNumber(char)) {
      const { newText } = numberFactory(char, _textValue, _cursorPosition);
      _cursorPosition = _cursorPosition + 1;
      outputText = outputText += newText
    }
  }

  return {
    textValue: outputText,
    cursorPosition: _cursorPosition,
    selectedText: '',
  };
}