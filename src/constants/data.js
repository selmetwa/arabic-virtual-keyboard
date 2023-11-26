export const alphabet = [{
    'ar': 'ا',
    'en': 'a',
    'label': ['a', 'A'],
    'title': 'Alif, corresponding to the letter A in English'
  },
  {
    'ar': 'ب',
    'en': 'b',
    'label': ['b', 'B', 'p', 'P'],
    'title': 'Ba, corresponding to the letter B in English'
  },
  {
    'ar': 'ت',
    'en': 't',
    'label': ['t'],
    'title': 'Ta, corresponding to the letter T in English'
  },
  {
    'ar': 'ث',
    'en': "th",
    'label': ["t'"],
    'title': "Tha, corresponding to the sound TH in English"
  },
  {
    'ar': 'ج',
    'en': 'j',
    'label': ['j', 'J'],
    'title': 'Jim, corresponding to the letter J in English'
  },
  {
    'ar': 'ح',
    'en': 'H',
    'label': ['H'],
    'title': 'Ha, does not have a corresponding sound in English'
  },
  {
    "ar": 'خ',
    'en': "kh",
    'label': ["H'", "x", 'X'], // TODO: handle all english inputs gracefully
    'title': "Kha, does not have a corresponding sound in English"
  },
  {
    "ar": 'د',
    'en': "d",
    'label': ["d"],
    'title': "Dal, corresponding to the letter D in English"
  },
  {
    "ar": 'ذ',
    'en': "dh",
    'label': ["d'"],
    'title': "Dhal, does not have a corresponding sound in Englishh"
  },
  {
    "ar": 'ر',
    'en': "r",
    'label': ["r", 'R'],
    'title': "Ra, corresponding to the letter R in English"
  },
  {
    "ar": 'ز',
    'en': "z",
    'label': ["z"],
    'title': "Zayn, corresponding to the letter Z in English"
  },
  {
    "ar": 'س',
    'en': "s",
    'label': ["s", 'c', 'C'],
    'title': "Sin, corresponding to the letter S in English"
  },
  {
    "ar": 'ش',
    "en": "sh",
    'label': ["s'"],
    'title': "Shin, does not have a corresponding sound in English"
  },
  {
    "ar": 'ص',
    'en': "S",
    'label': ["S"],
    'title': "Sad, does not have a corresponding sound in English"
  },
  {
    "ar": 'ض',
    'en': "D",
    'label': ["D"],
    'title': "Dad, does not have a corresponding sound in English"
  },
  {
    "ar": 'ط',
    'en': "T",
    'label': ["T"],
    'title': "Ta, does not have a corresponding sound in English"
  },
  {
    "ar": 'ظ',
    'en': "Z",
    'label': ["Z"],
    'title': "Zha, does not have a corresponding sound in English"
  },
  {
    "ar": 'ع',
    'en': "g",
    'label': ["g", 'G'],
    'title': "Ayn, does not have a corresponding sound in English"
  },
  {
    "ar": 'غ',
    'en': "gh",
    'label': ["g'", "G'"],
    'title': "Ghayn, does not have a corresponding sound in English"
  },
  {
    'ar': 'ف',
    'en': "f",
    'label': ["f", 'F', 'v', 'V'],
    'title': "Fa, corresponding to the letter F in English"
  },
  {
    "ar": 'ق',
    'en': "q",
    'label': ["q", 'Q'],
    'title': "Qaf, does not have a corresponding sound in English"
  },
  {
    "ar": 'ك',
    'en': "k",
    'label': ["k", 'K'],
    'title': "Kaf, corresponding to the letter K in English"
  },
  {
    "ar": 'ل',
    'en': "l",
    'label': ["l", 'L'],
    'title': "Lam, corresponding to the letter L in English"
  },
  {
    "ar": 'م',
    'en': "m",
    'label': ["m", 'M'],
    'title': "Mim, corresponding to the letter M in English"
  },
  {
    "ar": 'ن',
    'en': "n",
    'label': ["n", 'N'],
    'title': "Nun, corresponding to the letter N in English"
  },
  {
    'ar': 'ه',
    'en': "h",
    'label': ["h"],
    'title': "Ha, corresponding to the letter H in English"
  },
  {
    'ar': 'و',
    'en': "w",
    'label': ["w", 'W', "o", "O", 'u', 'U'],
    'title': "Waw, corresponding to the letter W in English"
  },
  {
    "ar": 'ي',
    'en': "y",
    'label': ["y", "Y", "i", "I", 'e', 'E'],
    'title': "Ya, corresponding to the letter Y in English"
  },
  {
    "ar": 'ء',
    'en': "-",
    'label': ["-"],
    'title': "Hamza, glottal stop"
  },
]

export const diacritics = [{
    "ar": '\u064E',
    'en': '=a',
    'label': '=a',
    'title': 'Fatha, short vowel a'
  },
  {
    "ar": '\u0650',
    'en': '=i',
    'label': '=i',
    'title': 'Kasra, short vowel i'
  },
  {
    "ar": '\u064F',
    'en': '=u',
    'label': '=u',
    'title': 'Damma, short vowel u'
  },
  {
    "ar": '\u0651',
    'en': '=s',
    'label': '=s',
    'title': 'Shadda, doubling of the consonant'
  },
  {
    "ar": '\u064B', // need this
    'en': '=A',
    'label': '=A',
    'title': 'Fathatan'
  },
  {
    "ar": '\u064D',
    'en': '=I',
    'label': '=I',
    'title': 'Kasratan'
  },
  {
    "ar": '\u064C', // need this
    'en': '=U',
    'label': '=U',
    'title': 'Dammatan'
  },
  {
    "ar": '\u0652',
    'en': '=o',
    'label': '=o',
    'title': 'Sukun, no vowel'
  },
]

export const numbers = [

  {
    'type': 'number',
    'ar': '\u0661',
    'en': '1',
    'label': '1',
    'title': '1',
    "shifted": '!'
  },
  {
    'type': 'number',
    'ar': '\u0662',
    'en': '2',
    'label': '2',
    'title': '2',
    "shifted": '@'
  },
  {
    'type': 'number',
    'ar': '\u0663',
    'en': '3',
    'label': '3',
    'title': '3',
    "shifted": '#'
  },
  {
    'type': 'number',
    'ar': '\u0664',
    'en': '4',
    'label': '4',
    'title': '4',
    "shifted": '$'
  },
  {
    'type': 'number',
    'ar': '\u0665',
    'en': '5',
    'label': '5',
    'title': '5',
    "shifted": '٪'
  },
  {
    'type': 'number',
    'ar': '\u0666',
    'en': '6',
    'label': '6',
    'title': '6',
    "shifted": '^'
  },
  {
    'type': 'number',
    'ar': '\u0667',
    'en': '7',
    'label': '7',
    'title': '7',
    "shifted": '&'
  },
  {
    'type': 'number',
    'ar': '\u0668',
    'en': '8',
    'label': '8',
    'title': '8',
    "shifted": '*'
  },
  {
    'type': 'number',
    'ar': '\u0669',
    'en': '9',
    'label': '9',
    'title': '9',
    "shifted": '('
  },
  {
    'type': 'number',
    'ar': '\u0660',
    'en': '0',
    'label': '0',
    'title': '0',
    "shifted": ')'
  },
]

export const special_letters_and_punctuation = [{
    'ar': 'ئ',
    'en': 'y==',
    'label': 'y==',
    'title': 'yeh with hamza above'
  },
  {
    "ar": 'ؤ',
    'en': 'w==',
    'label': 'w==',
    'title': 'waw with hamza above'
  },
  {
    "ar": 'إ',
    'en': 'a==',
    'label': 'a==',
    'title': 'alef with hamza below'
  },
  {
    "ar": 'ة',
    'en': "a'",
    'label': "a'",
    'title': "Ta marbouta, does not have a corresponding sound in English"
  },
  {
    "ar": 'ى',
    'en': "Y",
    'label': "Y",
    'title': "Alif maqsura"
  },
  {
    "ar": '؟',
    'en': "?",
    'label': "?",
    'title': "Question mark"
  },
  {
    "ar": '،',
    'en': ",",
    'label': ",",
    'title': "Comma"
  },
  {
    "ar": '؛',
    'en': ";",
    'label': ";",
    'title': "Semicolon"
  },
  {
    "ar": '.',
    'en': ".",
    'label': ".",
    'title': "Period"
  },
]