import { first_row, shifted_first_row } from "./keyboard_rows/first_row.js"
import { second_row, shifted_second_row } from "./keyboard_rows/second_row.js"
import { third_row, shifted_third_row } from "./keyboard_rows/third_row.js"
import { fourth_row, shifted_fourth_row } from "./keyboard_rows/fourth_row.js"
import { fifth_row } from "./keyboard_rows/fifth_row.js"
import { shifted_sixth_row, sixth_row } from "./keyboard_rows/sixth_row.js"

const allKeys = [
  ...first_row,
  ...second_row,
  ...third_row,
  ...fourth_row,
  ...fifth_row,
  ...sixth_row,
  ...shifted_first_row,
  ...shifted_second_row,
  ...shifted_third_row,
  ...shifted_fourth_row,
  ...shifted_sixth_row
]

export const letters = allKeys.filter(button => button.type === 'letter')
export const englishLetters = letters.map(letter => letter.en)
export const punctuation = allKeys.filter(button => button.type === 'punctuation')
export const numbers = allKeys.filter(button => button.type === 'number')
export const diacritics = allKeys.filter(button => button.type === 'diacritic')
export const specialCharacters = allKeys.filter(button => button.type === 'special_char')