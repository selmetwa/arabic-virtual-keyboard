import { numbers } from "../constants/data.js";

/**
 * Function to return the corresponding arabic number based on the english number input.
 * @param {string} englishNumber - The english number to be converted to arabic.
 * @param {Element} text - The text element to be updated, we need the cursor position and current text
 * @returns {string} arabicNumber - The arabic number.
 */
export const numberFactory = (englishNumber, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const numberObject = numbers.find((obj) => obj.en === englishNumber);
  const arabicNumber = numberObject && numberObject.ar;

  originalArray.splice(cursorPosition, 0, arabicNumber);
  const newText = originalArray.join('');
  return { newText, newCursorPosition: cursorPosition };
};

/** 
 * Function to check if the value is a number.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - True if the value is a number, false otherwise.
 */
export const isNumber = (value) => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(value));
};

/**
 * Function to return corresponding arabic number based on the english number input.
 */
export const correspondingArabicNumber = (englishNumber) => {
  const numberObject = numbers.find((obj) => obj.en === englishNumber);
  const arabicNumber = numberObject && numberObject.ar;
  return arabicNumber
}