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

/**
 * Function to delete selected text.
 * @param {string} textValue - original text
 * @param {string} selectedText - selected text to delete
 * @returns {string} - updated text value after deleting selected text
 */
export const deleteSelectedText = (textValue, selectedText) => {
  const newTextValue = textValue.replace(selectedText, '');
  return newTextValue;
}

/**
 * Test if string is arabic or not
 * @param {string} text 
 * @returns {boolean}
 */
export const isInputArabic = (text) => {
  const arabicRange = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  return arabicRange.test(text);
}