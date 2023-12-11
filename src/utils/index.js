import { numbers, punctuation, letters, englishLetters, diacritics } from "../constants/data.js";

/**
 * Function to check if the value is a letter.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - True if the value is a letter, false otherwise.
 */
export const isLetter = (value) => {
  return englishLetters.includes(value);
}

/**
 * Function to check if the value is punctuation.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - True if the value is punctuation, false otherwise.
 */
export const isPunctuation = (value) => {
  return ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '[', ']', '|', '\\', ':', ';', '"', '<', '>', ',', '.', '?', '/', '~', '`'].includes(value);
}

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
    return textarea.value.substring(start, end) || '';
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
 * @param {key} string - The key pressed.
 * @returns {boolean} - True if the key pressed is the down arrow, false otherwise.
 */
export const isDownArrow = (key) => {
  return key === 'ArrowDown';
}

/**
 * @param {key} string - The key pressed.
 * @returns {boolean} - True if the key pressed is the up arrow, false otherwise.
 */
export const isUpArrow = (key) => {
  return key === 'ArrowUp';
}

/**
 * @param {key} string - The key pressed.
 * @returns {boolean} - True if the key pressed is an arrow key, false otherwise.
 */
export const isArrowKey = (key) => {
  return isRightArrow(key) || isLeftArrow(key) || isDownArrow(key) || isUpArrow(key);
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
 * Return corresponding english letter for arabic letter
 * @param {string} letter
 * @returns {string} 
 */
export const convertLetterToArabic = (letter) => {
  const letterObject = letters.find((obj) => obj.en === letter);
  const arabicLetter = letterObject && letterObject.ar;
  return arabicLetter;
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

/**
 * Return corresponding arabic diacritic mark for english key pressed
 * @param {string} key - The key pressed in english.
 * @returns {string} diacriticMark - The key pressed in arabic.
 */
export const getArabicDiacriticMark = (key) => {
  const diacriticMarkObject = diacritics.find((obj) => obj.en === key);
  const diacriticMark = diacriticMarkObject && diacriticMarkObject.ar;
  return diacriticMark;
}

/**
 * Return corresponding arabic punctuation for english punctuation
 * @param {string} key - The key pressed in english. 
 * @returns {string} punctuationArabic - The key pressed in arabic.
 */
export const getArabicPunctuation = (key) => {
  const punctuationObject = punctuation.find((obj) => obj.en === key);
  const punctuationArabic = punctuationObject && punctuationObject.ar;
  return punctuationArabic;
}

/**
 * Function to encrypt text
 * @param {string} salt - The salt to be used for encryption.
 * @param {string} text - The text to be encrypted.
 * @returns {string} - The encrypted text.
 */
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

/**
 * Function to check the previous letter
 * @param {string} textValue - The text value.
 * @param {number} cursorPosition - The cursor position.
 * @returns {string} - The previous english letter letter.
 */
export const checkPreviousLetter = (textValue, cursorPosition) => {
  const previousLetter = textValue[cursorPosition - 1];
  const previousEnglishLetterObj = letters.find((obj) => obj.ar === previousLetter)
  const previousEnglishLetter = previousEnglishLetterObj && previousEnglishLetterObj.en;
  return previousEnglishLetter;
}