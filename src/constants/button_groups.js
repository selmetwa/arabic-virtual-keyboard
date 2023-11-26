import { first_row, shifted_first_row } from "./keyboard_rows/first_row"
import { second_row, shifted_second_row } from "./keyboard_rows/second_row"
import { third_row, shifted_third_row } from "./keyboard_rows/third_row"
import { fourth_row, shifted_fourth_row } from "./keyboard_rows/fourth_row"
import { fifth_row } from "./keyboard_rows/fifth_row"

export const button_groups = [{
    buttons: first_row,
    name: 'first_row'
  },
  {
    buttons: second_row,
    name: 'second_row'
  },
  {
    buttons: third_row,
    name: 'third_row'
  },
  {
    buttons: fourth_row,
    name: 'fourth_row'
  },
  {
    buttons: fifth_row,
    name: 'fifth_row'
  }
]

export const shifted_button_groups = [{
    buttons: shifted_first_row,
    name: 'first_row'
  },
  {
    buttons: shifted_second_row,
    name: 'second_row'

  },
  {
    buttons: shifted_third_row,
    name: 'third_row'

  },
  {
    buttons: shifted_fourth_row,
    name: 'fourth_row'
  },
  {
    buttons: fifth_row,
    name: 'fifth_row'
  }
]