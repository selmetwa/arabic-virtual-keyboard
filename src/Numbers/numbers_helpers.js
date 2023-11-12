import { numbers } from "../constants/data.js";

export const numberFactory = (englishNumber, originalText, cursorPosition) => {
  const originalArray = originalText.split('');
  const numberObject = numbers.find((obj) => obj.en === englishNumber);
  const arabicNumber = numberObject && numberObject.ar;

  originalArray.splice(cursorPosition, 0, arabicNumber);
  const newText = originalArray.join('');
  const newCursorPosition = cursorPosition + 1;
  return { newText, newCursorPosition };
};

export const isNumber = (value) => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(value));
};

export const correspondingArabicNumber = (englishNumber) => {
  const numberObject = numbers.find((obj) => obj.en === englishNumber);
  const arabicNumber = numberObject && numberObject.ar;
  return arabicNumber
}