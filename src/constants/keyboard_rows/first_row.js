import { numbers } from "../data.js"

export const shifted_first_row = [{
    'type': 'punctuation',
    'ar': '~',
    'en': '~',
    'label': '~',
    'title': '~',
    'shifted': '`'
  },
  {
    'type': 'punctuation',
    'ar': ')',
    'en': ')',
    'label': ')',
    'title': ')',
    'shifted': '0'
  },
  {
    'type': 'punctuation',
    'ar': '!',
    'en': '!',
    'label': '!',
    'title': '!',
    'shifted': '1'
  },
  {
    'type': 'punctuation',
    'ar': '@',
    'en': '@',
    'label': '@',
    'title': '@',
    'shifted': '2'
  },
  {
    'type': 'punctuation',
    'ar': '#',
    'en': '#',
    'label': '#',
    'title': '#',
    'shifted': '3'
  },
  {
    'type': 'punctuation',
    'ar': '$',
    'en': '$',
    'label': '$',
    'title': '$',
    'shifted': '4'
  },
  {
    'type': 'punctuation',
    'ar': '٪',
    'en': '%',
    'label': '%',
    'title': '%',
    'shifted': '5'
  },
  {
    'type': 'punctuation',
    'ar': '^',
    'en': '^',
    'label': '^',
    'title': '^',
    'shifted': '6'
  },
  {
    'type': 'punctuation',
    'ar': '&',
    'en': '&',
    'label': '&',
    'title': '&',
    'shifted': '7'
  },
  {
    'type': 'punctuation',
    'ar': '*',
    'en': '*',
    'label': '*',
    'title': '*',
    'shifted': '8'
  },
  {
    'type': 'punctuation',
    'ar': '(',
    'en': '(',
    'label': '(',
    'title': '(',
    'shifted': '9'
  },

  {
    'type': 'punctuation',
    'ar': '_',
    'en': '_',
    'label': '_',
    'title': '_',
    'shifted': '-'
  },
  {
    'type': 'punctuation',
    'ar': '+',
    'en': '+',
    'label': '+',
    'title': '+',
    'shifted': '='
  },
  {
    'type': 'punctuation',
    "ar": 'Backspace',
    "en": 'Backspace',
    'title': 'Backspace',
    'modifierClass': 'wider'
  },
]

export const first_row = [{
    'type': 'punctuation',
    'ar': '`',
    'en': '`',
    'label': '`',
    'title': '`',
    'shifted': '~'
  },
  ...numbers,
  {
    'type': 'punctuation',
    'ar': '-',
    'en': '-',
    'label': '-',
    'title': '-',
    'shifted': '_'
  },
  {
    'type': 'punctuation',
    'ar': '=',
    'en': '=',
    'label': '=',
    'title': '=',
    'shifted': '+'
  },
  {
    'type': 'punctuation',
    "ar": 'Backspace',
    "en": 'Backspace',
    'title': 'Backspace',
    'modifierClass': 'wider'
  },
]