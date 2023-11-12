/** 
 * Function to check if the value is a number.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - True if the value is a number, false otherwise.
 */
export const isNumber = (value) => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(value));
};

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

/**
 * @param {key} string - The key pressed.
 * @returns {boolean} - True if the key pressed is a a right arrow, false otherwise.
 */
export const isRightArrow = (key) => {
  return key === 'ArrowRight';
}

/**
 * @param {key} string - The key pressed.
 * @returns {boolean} - True if the key pressed is a a left arrow, false otherwise.
 */
export const isLeftArrow = (key) => {
  return key === 'ArrowLeft';
}