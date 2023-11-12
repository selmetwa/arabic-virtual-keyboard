export const handleDeleteText = (cursorPosition, textValue) => {
  const arr = textValue.split('');
  arr.splice(cursorPosition - 1, 1);
  return { newCursorPosition: cursorPosition - 1, newText: arr.join('') };
}

export const deleteSelectedText = (textValue, selectedText) => {
  const newTextValue = textValue.replace(selectedText, '');
  return newTextValue;
}