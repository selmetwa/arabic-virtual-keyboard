import { alphabet, diacritics, numbers, special_letters_and_punctuation } from './data.js';

export const button_groups = [
  {
    type: 'number',
    buttons: numbers,
  },
  {
    type: 'alphabet',
    buttons: alphabet,
  },
  {
    type: 'special_letters_and_punctuation',
    buttons: special_letters_and_punctuation,
  },
  {
    type: 'diacritic',
    buttons: diacritics,
  },
]