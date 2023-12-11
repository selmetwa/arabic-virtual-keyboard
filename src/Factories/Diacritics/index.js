import { diacritics } from "../../constants/data";

/**
 * Convert key to diacritic mark
 * @param {string} previousKey
 * @param {string} previousPreviousKey
 * @returns {string} - valid key or empty string
 */
export const convertValidKey = (previousKey, previousPreviousKey) => {

  const lastTwoKeys = previousPreviousKey + previousKey

  // handle two keys cases first
  if (['an', 'An', 'aN', 'AN'].includes(lastTwoKeys)) {
    return "an="
  }
  if (['un', 'Un', 'uN', 'UN', 'wn', 'Wn', 'wN', 'WN', 'on', 'oN', 'On', 'ON'].includes(lastTwoKeys)) {
    return "un="
  }

  if (['in', 'In', 'iN', 'IN', 'yn', 'Yn', 'yN', 'YN', 'en', 'En', 'eN', 'EN'].includes(lastTwoKeys)) {
    return "in="
  }

  // handle single key cases
  if (['s', 'S'].includes(previousKey)) {
    return "s="
  }
  if (['h', 'H'].includes(previousKey)) {
    return "h="
  }
  if (['i', 'e', 'y', 'I', 'Y', 'E'].includes(previousKey)) {
    return "i="
  }
  if (['u', 'w', 'U', 'W', 'o', 'O'].includes(previousKey)) {
    return "u="
  }
  if (['a', 'A'].includes(previousKey)) {
    return "a="
  }

  return ''
}

/**
 * Function to delete one character from text based on the cursor position.
 * @param {number} cursorPosition
 * @param {string} textValue
 * @returns {object} - new cursor position and new text
 */
export const handleDeleteText = (cursorPosition, textValue) => {
  const arr = textValue && textValue.split('') || [];
  arr.splice(cursorPosition - 1, 1);

  return {
    newCursorPosition: cursorPosition - 1,
    newText: arr.join('')
  };
}

/**
 * Function to insert diacritic mark into text based on the cursor position.
 * @param {string} mark - mark to insert
 * @param {string} originalText - original text
 * @param {number} cursorPosition - cursor position
 * @param {number} deleteCount - number of characters to delete
 * @returns {object} - new text and cursor position
 */
export const insertDiacriticMarkIntoArabic = (mark, originalText, cursorPosition, deleteCount) => {
  const arr = originalText && originalText.split('') || [];

  for (let i = 0; i < deleteCount; i++) {
    arr.splice(cursorPosition - (i + 1), 1);
  }

  const textAfterDeletion = arr.join('')

  const arrayAfterDeletion = textAfterDeletion.split('');
  arrayAfterDeletion.splice(cursorPosition, 0, mark);
  const newText = arrayAfterDeletion.join('');

  return { newText, newCursorPosition: cursorPosition - (deleteCount - 1) };
}

/**
 * @param {string} previousKey - Previous key pressed
 * @param {string} previousPreviousKey - Previous previous key pressed
 * @param {Types.State} state - current state of the keyboard
 * @returns {Types.State} - new state of the keyboard
 */
export const DiacriticsFactory = (previousKey, previousPreviousKey, state, handleAddActiveState) => {
  const mark = convertValidKey(previousKey, previousPreviousKey) || ''
  handleAddActiveState(mark)
  const diacriticObject = diacritics.find(diacritic => diacritic.en === mark)

  if (!diacriticObject) {
    return state
  }

  const diacriticMark = diacriticObject.ar
  const { newText, newCursorPosition } = insertDiacriticMarkIntoArabic(diacriticMark, state.textValue, state.cursorPosition, mark.length - 1)

  const newHistory = [...state.history, state.textValue]

  return {
    textValue: newText,
    historyIndex: newHistory.length - 1,
    history: newHistory,
    cursorPosition: newCursorPosition,
    selectedText: '',
  };
}