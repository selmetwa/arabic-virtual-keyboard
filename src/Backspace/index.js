export const handleDeleteText = (cursorPosition, textValue) => {
  const arr = textValue.split('');
  arr.splice(cursorPosition - 1, 1);

  return {
    newCursorPosition: cursorPosition - 1,
    newText: arr.join('')
  };
}

export const deleteSelectedText = (textValue, selectedText) => {
  const newTextValue = textValue.replace(selectedText, '');
  return newTextValue;
}

export const BackspaceFactory = (key, state) => {
  const _selectedText = state.selectedText;
  const _cursorPosition = state.cursorPosition;
  let _textValue = state.textValue;

  if (_textValue.length === 0) return state;

  if (!!_selectedText) {
    return {
      textValue: deleteSelectedText(_textValue, _selectedText),
      selectedText: "",
    };
  }

  const { newText, newCursorPosition } = handleDeleteText(_cursorPosition, _textValue);

  return {
    textValue: newText,
    cursorPosition: newCursorPosition >= 0 ? newCursorPosition : 0,
    previousKey: key,
    selectedText: "",
  };
}