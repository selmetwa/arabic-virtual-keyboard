import { deleteSelectedText } from "../Backspace/backspace_helpers.js";
import { isNumber, numberFactory } from "../Numbers/numbers_helpers";

export const PasteFactory = (event, state) => {
  const pastedText = (event.clipboardData).getData("text");
  console.log(pastedText)
  let _cursorPosition = state.cursorPosition;
  let _textValue = state.textValue;
  const _selectedText = state.selectedText;
  console.log({ _selectedText })
  if (!!_selectedText) {
    _textValue = deleteSelectedText(_textValue, _selectedText)
  }

  let outputText = ''
  for (let i = 0; i < pastedText.length; i++) {
    const char = pastedText[i];
    if (isNumber(char)) {
      const { newText, newCursorPosition } = numberFactory(
        char,
        _textValue,
        _cursorPosition
      );

      _cursorPosition = _cursorPosition + 1;
      outputText = outputText += newText
    }
  }

  return {
    textValue: outputText,
    cursorPosition: _cursorPosition,
  };
}