import * as Types from '../constants/types.js'
import { isNumber, deleteSelectedText, isInputArabic } from '../utils.js'
import { numberFactory } from '../Numbers/index.js'

/**
 * 
 * @param {Event} event - paste event
 * @param {string=} pastedTextFromClipboard - pasted text from clipboard
 * @param {Types.state} state - current state of the keyboard
 */
export const PasteFactory = (event, pastedTextFromClipboard, state) => {
  // console.log('PasteFactory', event, pastedTextFromClipboard, state)
  const pastedText = event && event.clipboardData && event.clipboardData.getData("text") || pastedTextFromClipboard;
  const isArabic = isInputArabic(pastedText)

  if (isArabic) {
    return {
      textValue: pastedText,
    }
  }

  console.log({ isArabic })
  alert(pastedText)
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