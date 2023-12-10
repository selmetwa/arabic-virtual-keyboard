import { first_row, shifted_first_row } from "./keyboard_rows/first_row"
import { second_row, shifted_second_row } from "./keyboard_rows/second_row"
import { third_row, shifted_third_row } from "./keyboard_rows/third_row"
import { fourth_row, shifted_fourth_row } from "./keyboard_rows/fourth_row"
import { fifth_row } from "./keyboard_rows/fifth_row"
import { sixth_row, shifted_sixth_row } from "./keyboard_rows/sixth_row"
import { mobile_first_row, shifted_mobile_first_row } from "./mobile_keyboard_rows/mobile_first_row"
import { mobile_second_row, shifted_mobile_second_row } from "./mobile_keyboard_rows/mobile_second_row"
import { mobile_third_row, shifted_mobile_third_row } from "./mobile_keyboard_rows/mobile_third_row"
import { mobile_fourth_row, shifted_mobile_fourth_row } from "./mobile_keyboard_rows/mobile_fourth_row"

export const desktop_button_groups = [{
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
    buttons: sixth_row,
    name: 'sixth_row'
  },
  {
    buttons: fifth_row,
    name: 'fifth_row'
  }
]

export const shifted_desktop_button_groups = [{
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
    buttons: shifted_sixth_row,
    name: 'sixth_row'
  },
  {
    buttons: fifth_row,
    name: 'fifth_row'
  }
]

export const mobile_button_groups = [{
    buttons: mobile_first_row,
    name: 'first_row_mobile'
  },
  {
    buttons: mobile_second_row,
    name: 'second_row_mobile'
  },
  {
    buttons: mobile_third_row,
    name: 'third_row_mobile'
  },
  {
    buttons: mobile_fourth_row,
    name: 'fourth_row_mobile'
  }
]

export const shifted_mobile_button_groups = [{
    buttons: shifted_mobile_first_row,
    name: 'first_row_mobile'
  },
  {
    buttons: shifted_mobile_third_row,
    name: 'third_row_mobile_shifted'
  },
  {
    buttons: shifted_mobile_second_row,
    name: 'second_row_mobile_shifted'
  },
  {
    buttons: shifted_mobile_fourth_row,
    name: 'fourth_row_mobile'
  }
]