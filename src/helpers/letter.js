import { alphabet } from '../constants/data.js';
const englishLetters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', "'",
  ]
  /** 
   * Function to check if keyboard input is a letter.
   * @param {string} character - The value to be checked.
   * @returns {boolean} - True if the value is a letter, false otherwise.
   */
export const isLetter = (character) => {
  return englishLetters.includes(character && character.toLowerCase());
}

/**
 * Function to return the corresponding arabic letter based on the english letter input.
 * @param {string} englishLetter - The english letter to be converted to arabic.
 * @returns {string} arabicLetter - The arabic letter.
 */
export const letterFactory = (englishLetter) => {
  const letterObject = alphabet.find((obj) => obj.label.includes(englishLetter));
  const arabicLetter = letterObject && letterObject.ar;

  if (!arabicLetter) {
    return '';
  }

  return arabicLetter;
};

/**
 * Function to return the corresponding english letter based on the arabic letter input.
 * @param {string} arabicLetter - The arabic letter to be converted to english.
 * @returns {string} englishLetter - The english letter.
 */
export const englishLetterFactory = (arabicLetter) => {
  const letterObject = alphabet.find((obj) => obj.ar === arabicLetter);
  const englishLetter = letterObject && letterObject.label[0];

  if (!englishLetter) {
    return '';
  }

  return englishLetter;
}

/**
 * @description Function to handle special cases where there is not a 1-1 match between
 * the english and arabic letters.
 * @param {string} text - The current value of our textarea, where we can pull the last arabic letter from.
 * @returns {string} updatedText - New text value after deleting the last arabic letter and adding the new one.
 */
export const specialLetterFactory = (text) => {
  if (typeof text !== 'string' || text.length === 0) {
    return '';
  }
  const copy = text.slice()
  const lastArabicLetter = text.charAt(text.length - 1);;
  const correspondingEnglishLetter = englishLetterFactory(lastArabicLetter);
  const newArabicLetter = letterFactory(correspondingEnglishLetter + "'");

  if (!newArabicLetter) {
    return copy;
  }

  let newText = copy.slice(0, -1);
  newText += newArabicLetter;

  return newText;
}