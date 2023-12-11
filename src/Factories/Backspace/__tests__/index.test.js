import { assert } from '@esm-bundle/chai';
import { handleDeleteText, BackspaceFactory } from '../index.js';
import { isInputArabic } from '../../../utils/index.js';

const assertObjectsEqual = (actual, expected, message) => {
  try {
    assert.deepEqual(actual, expected);
    console.log('\x1b[32m%s\x1b[0m', `PASS: ${message}`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `FAIL: ${message}`);
    console.error(error);
  }
};

describe('handleDeleteText', () => {
  it('Deleting character in the middle', () => {
    const cursorPosition = 3;
    const textValue = '١٢٣٤٥';
    const result = handleDeleteText(cursorPosition, textValue);
    const expected = {
      newCursorPosition: cursorPosition - 1,
      newText: '١٢٤٥',
    };
    assertObjectsEqual(result, expected, 'Deleting character in the middle');
  });

  it('Deleting the last character', () => {
    const cursorPosition = 5;
    const textValue = '١٢٣٤٥';
    const result = handleDeleteText(cursorPosition, textValue);
    const expected = {
      newCursorPosition: cursorPosition - 1,
      newText: '١٢٣٤',
    };
    assertObjectsEqual(result, expected, 'Deleting the last character');
  });

  it('Deleting the first character', () => {
    const cursorPosition = 1;
    const textValue = '١٢٣٤٥';
    const result = handleDeleteText(cursorPosition, textValue);
    const expected = {
      newCursorPosition: cursorPosition - 1,
      newText: '٢٣٤٥',
    };
    assertObjectsEqual(result, expected, 'Deleting the first character');
  });
});

describe('BackspaceFactory', () => {
  it('Backspace with valid non-empty Arabic text', () => {
    const key = 'Backspace';
    const state = {
      selectedText: '',
      cursorPosition: 3,
      textValue: 'أبج١٢٣',
      history: [],
      historyIndex: 0,
    };

    assert.isTrue(isInputArabic(state.textValue), 'Input text is valid Arabic');

    const result = BackspaceFactory(key, state);

    const expected = {
      textValue: 'أب١٢',
      history: ['أبج١٢٣'],
      historyIndex: 1,
      cursorPosition: 2,
      selectedText: '',
    };

    assertObjectsEqual(result, expected, 'Backspace with valid non-empty Arabic text');
  });

  it('Backspace with valid empty Arabic text', () => {
    const key = 'Backspace';
    const state = {
      selectedText: '',
      cursorPosition: 0,
      textValue: '',
      history: [],
      historyIndex: 0,
    };

    assert.isFalse(isInputArabic(state.textValue), 'Input text is valid Arabic');

    const result = BackspaceFactory(key, state);

    const expected = state; // No change expected

    assertObjectsEqual(result, expected, 'Backspace with valid empty Arabic text');
  });

  it('Backspace with selected valid Arabic text', () => {
    const key = 'Backspace';
    const state = {
      selectedText: '١٢٣',
      cursorPosition: 3,
      textValue: 'أبج١٢٣د',
      history: [],
      historyIndex: 0,
    };

    assert.isTrue(isInputArabic(state.textValue), 'Input text is valid Arabic');

    const result = BackspaceFactory(key, state);

    const expected = {
      textValue: 'أبجد',
      history: ['أبج١٢٣د'],
      historyIndex: 1,
      cursorPosition: 3,
      selectedText: '',
    };

    assertObjectsEqual(result, expected, 'Backspace with selected valid Arabic text');
  });
});