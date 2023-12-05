import {
  isNumber,
  isArrowKey,
  crypt,
  isPunctuation,
  isLetter,
  checkPreviousLetter,
  isDiacriticMark,
} from "../utils/index.js";

import { NumbersFactory } from "./Numbers/index.js"
import { BackspaceFactory } from "./Backspace/index.js";
import { MouseCutFactory, UpdateSelectedTextFactory, TextareaClickFactory } from "./MouseEvents/index.js";
import { PasteFactory } from "./Paste/index.js";
import { KeyboardShortcutFactory, KeyboardNavigationFactory } from "./KeyboardEvents/index.js";
import { SpaceFactory } from "./Space/index.js";
import { PunctuationFactory } from "./Punctuation/index.js";
import { LettersFactory } from "./Letters/index.js";
import { DiacriticsFactory } from "./Diacritics/index.js";
import { TabFactory } from "./Tab/index.js";
import { EnterFactory } from "./Enter/index.js";
import { SpecialCharacterFactory } from "./SpecialCharacters/index.js";

export const TaskMaster = (key, state, textarea, handleAddActiveState) => {
  const previousLetter = checkPreviousLetter(state.textValue, state.cursorPosition);
  const previousPreviousLetter = checkPreviousLetter(state.textValue, state.cursorPosition - 1);

  switch (true) {
    case key === 'Meta':
      handleAddActiveState("meta")
      return { previousKey: key }
    case key === 'Backspace':
      return BackspaceFactory(key, state);
    case key === 'Enter':
      return EnterFactory(state, textarea);
    case key === 'Tab':
      return TabFactory(state);
    case key === 'Space':
      handleAddActiveState("space")
      return SpaceFactory(state);
    case isNumber(key):
      return NumbersFactory(key, state);
    case isArrowKey(key):
      return KeyboardNavigationFactory(key, state, textarea);
    case isPunctuation(key):
      return PunctuationFactory(key, state);
    case key === '-':
      if (previousLetter === '-') {
        return SpecialCharacterFactory(previousLetter, previousPreviousLetter, state);
      } else {
        return LettersFactory(key, state);
      }

    case isLetter(key):
      return LettersFactory(key, state);

    case key === '=':
      return DiacriticsFactory(previousLetter, previousPreviousLetter, state);
    case key === "'":
      if (['d', 'g', 's', 't', 'h', 'H'].includes(previousLetter)) {
        const newKey = previousLetter + "'";
        const res = BackspaceFactory(key, state);
        const newState = {...state, ...res }
        handleAddActiveState(newKey)
        return LettersFactory(newKey, newState);
      } else {
        return
      }
  }
};