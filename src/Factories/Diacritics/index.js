import { diacritics } from "../../constants/data";

const convertValidKey = (previousKey, previousPreviousKey) => {

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
}

export const handleDeleteText = (cursorPosition, textValue) => {
  const arr = textValue && textValue.split('') || [];
  arr.splice(cursorPosition - 1, 1);

  return {
    newCursorPosition: cursorPosition - 1,
    newText: arr.join('')
  };
}

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

export const DiacriticsFactory = (previousKey, previousPreviousKey, state) => {
  const mark = convertValidKey(previousKey, previousPreviousKey)
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
    previousKey: previousKey,
    selectedText: '',
  };
}