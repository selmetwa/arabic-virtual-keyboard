import { deleteSelectedText, handleDeleteText } from "./backspace_helpers";

export const BackspaceFactory = (key, state) => {
  const _selectedText = state.selectedText;
  const _cursorPosition = state.cursorPosition;
  let _textValue = state.textValue;

  if (_textValue.length === 0) return state;

  console.log({ _selectedText })
  if (!!_selectedText) {
    return {
      textValue: deleteSelectedText(_textValue, _selectedText),
      selectedText: "",
    };
  }

  const { newText, newCursorPosition } = handleDeleteText(_cursorPosition, _textValue);
  console.log({ newText })
  return {
    textValue: newText,
    cursorPosition: newCursorPosition,
    previousKey: key,
  };
}