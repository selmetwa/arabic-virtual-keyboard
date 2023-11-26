import { numbers } from "../constants/data.js";

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
  // const text = textarea.value.substring(start, end);
  // console.log({ start, end, textarea, text });
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

/**
 * Return corresponding arabic number for english number
 * @param {string} number
 * @returns {string}
 */
export const convertNumberToArabic = (englishNumber) => {
  const numberObject = numbers.find((obj) => obj.en === englishNumber);
  const arabicNumber = numberObject && numberObject.ar;
  return arabicNumber;
}

export const crypt = (salt, text) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};