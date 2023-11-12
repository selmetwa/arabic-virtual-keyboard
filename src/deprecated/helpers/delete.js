/**
 * 
 * @param {HTMLTextAreaElement} textarea 
 * @returns {string} newText - The new text after deleting.
 * @returns {number} cursorPosition - The new cursor position after deleting.
 */
export const handleDeleteText = (textarea) => {
  const cursorPosition = textarea.selectionStart - 1;
  const newText = textarea.value.substring(0, cursorPosition) + textarea.value.substring(textarea.selectionEnd);
  return { newCursorPosition: cursorPosition, newText };
}

/**
 * @param {string} textInput - The current text input we want to delete from.
 * @param {string} selectedText - The selected text we want to delete.
 * @returns {string} newTextValue - The new text input after deleting.
 */
export const deleteSelectedText = (textInput, selectedText) => {
  const newTextValue = textInput.replace(selectedText, '');
  return newTextValue;
}