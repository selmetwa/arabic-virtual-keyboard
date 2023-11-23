import * as Types from '../constants/types.js'
import { isNumber, deleteSelectedText, isInputArabic } from '../utils.js'
import { insertEnglishNumberIntoArabic } from '../Numbers/index.js'

/**
 * DEPRECATED
 * @param {Event=} event - paste event
 * @param {string=} pastedTextFromClipboard - pasted text from clipboard
 * @param {Types.state} state - current state of the keyboard
 */
export const PasteFactory = (event, pastedTextFromClipboard, state) => {
  const pastedText = event && event.clipboardData && event.clipboardData.getData("text") || pastedTextFromClipboard;
  const isArabic = isInputArabic(pastedText)

  if (isArabic) {
    return {
      textValue: pastedText,
    }
  }

  let _cursorPosition = state.cursorPosition;
  let _textValue = state.textValue;

  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText)
  }

  let outputText = ''

  for (let i = 0; i < pastedText.length; i++) {
    const char = pastedText[i];

    if (isNumber(char)) {
      const { newText } = insertEnglishNumberIntoArabic(char, _textValue, _cursorPosition);
      console.log({ newText })
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