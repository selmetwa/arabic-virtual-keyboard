function reverseString(str) {
  return str.split("").reverse().join("");
}

/**
 * @param {string} textInput - The current text input we want to delete from.
 * @returns {string} newTextValue - The new text input after deleting.
 */
export const deleteFromTextInput = (textInput) => {
  console.log('textInput', textInput)
  const str = reverseString(textInput);
  return str?.substring(0, textInput.length - 1) || '';
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