import {
  isNumber,
  isArrowKey,
  isPunctuation,
  isLetter,
  checkPreviousLetter,
} from "../utils/index.js";

import { NumbersFactory } from "./Numbers/index.js"
import { BackspaceFactory } from "./Backspace/index.js";
import { KeyboardNavigationFactory } from "./KeyboardEvents/index.js";
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
      return handleAddActiveState("meta")
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
      if (previousLetter === '-' && !!previousPreviousLetter && previousPreviousLetter !== '-') {
        return SpecialCharacterFactory(previousLetter, previousPreviousLetter, state, handleAddActiveState);
      }

      return LettersFactory(key, state);

    case isLetter(key):
      return LettersFactory(key, state);

    case key === '=':
      return DiacriticsFactory(previousLetter, previousPreviousLetter, state, handleAddActiveState);
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