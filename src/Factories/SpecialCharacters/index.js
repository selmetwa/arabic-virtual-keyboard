import { specialCharacters } from "../../constants/data"

const convertToSpecialCharacter = (key) => {
  const yaLetters = ['y', 'Y', 'e', 'E']
  const waLetters = ['w', 'W', 'u', 'U', 'o', 'O']

  if (yaLetters.includes(key)) {
    return 'ئ'
  }
  if (waLetters.includes(key)) {
    return 'ؤ'
  }
  if (['a'].includes(key)) {
    return 'إ'
  }
  if (['A'].includes(key)) {
    return 'أ'
  }
}

export const handleDeleteText = (cursorPosition, textValue) => {
  const arr = textValue && textValue.split('') || [];
  arr.splice(cursorPosition - 1, 1);

  return {
    newCursorPosition: cursorPosition - 1,
    newText: arr.join('')
  };
}

export const insertSpecialCharIntoArabic = (mark, originalText, cursorPosition) => {
  const arr = originalText && originalText.split('') || [];

  for (let i = 0; i < 2; i++) {
    arr.splice(cursorPosition - (i + 1), 1);
  }

  const textAfterDeletion = arr.join('')

  const arrayAfterDeletion = textAfterDeletion.split('');
  arrayAfterDeletion.splice(cursorPosition, 0, mark);
  const newText = arrayAfterDeletion.join('');

  return { newText, newCursorPosition: cursorPosition - 1 };
}

export const SpecialCharacterFactory = (previousKey, previousPreviousKey, state, handleAddActiveState) => {
  const specialChar = convertToSpecialCharacter(previousPreviousKey)

  if (specialChar) {
    const englishChar = specialCharacters.find(char => char.ar === specialChar)
    handleAddActiveState(englishChar.en)
  }

  if (!specialChar) {
    return state
  }

  const { newText, newCursorPosition } = insertSpecialCharIntoArabic(specialChar, state.textValue, state.cursorPosition)

  const newHistory = [...state.history, state.textValue]

  return {
    textValue: newText,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    cursorPosition: newCursorPosition,
    selectedText: '',
  };
}