/**
 * Function to return the current selected text of a textarea.
 * @param {Element} - The textarea element.
 * @returns {string} - The selected text.
 */
export const getSelectedText = (textarea) => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (start !== end) {
    return textarea.value.substring(start, end);
  }

  return ""
};
