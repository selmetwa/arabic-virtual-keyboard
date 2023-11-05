import { alphabet } from '../constants/data.js';
const englishLetters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
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
  const letterObject = alphabet.find((obj) => obj.en === englishLetter);
  const arabicLetter = letterObject && letterObject.ar;
  return arabicLetter;
};