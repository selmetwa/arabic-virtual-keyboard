import * as Types from '../../constants/types';
import { isInputArabic, deleteSelectedText } from '../../utils';
import { letters, punctuation, numbers, diacritics } from "../../constants/data.js"

const allKeys = [].concat(letters, punctuation, numbers, diacritics)

/**
 * convert string of english text to a string of arabic text
 * @param {string} text 
 * @returns {string} arabic text
 */
function convertToArabic(text) {
  let output = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const button = allKeys.find(button => button.en === char)
    const arabic = button && button.ar || char;
    output += arabic
  }

  return output;
}

/**
 * Function to handle pasting into the keyboard, handles both mouse and keyboard pasting
 * and handles both english and arabic paste inputs
 * @param {string} pastedText - the text that was pasted
 * @param {Types.State} state - current state of the keyboard
 * @returns {Types.State} - new state of the keyboard
 */
export const PasteFactory = (pastedText, state) => {
  const textToPaste = isInputArabic(pastedText) ? pastedText : convertToArabic(pastedText);
  let _textValue = state.textValue;
  if (!!state.selectedText) {
    _textValue = deleteSelectedText(_textValue, state.selectedText);
  }

  const modifiedString = _textValue.slice(0, state.cursorPosition) + textToPaste + _textValue.slice(state.cursorPosition);

  return {
    textValue: modifiedString,
    cursorPosition: state.cursorPosition + textToPaste.length,
    history: [...state.history, state.textValue],
    historyIndex: state.historyIndex + 1,
    selectedText: "",
  };
}