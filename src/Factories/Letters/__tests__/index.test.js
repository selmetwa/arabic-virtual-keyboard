import { assert } from '@esm-bundle/chai';

import { LettersFactory, insertEnglishLetterIntoArabic } from '../index.js';

describe('insertEnglishLetterIntoArabic', () => {
  it('should insert the Arabic equivalent of the English letter at the specified cursor position', () => {
    const englishLetter = 'a';
    const originalText = 'مرحبًا، العالم!';
    const cursorPosition = 7; // Cursor position after the comma

    const result = insertEnglishLetterIntoArabic(englishLetter, originalText, cursorPosition);

    assert.strictEqual(result.newText, 'مرحبًا،ا العالم!');
    assert.strictEqual(result.newCursorPosition, 8);
  });

  it('should handle inserting Arabic letters at the beginning of the text', () => {
    const englishLetter = 'h';
    const originalText = 'مرحبًا، العالم!';
    const cursorPosition = 0; // Cursor position at the beginning

    const result = insertEnglishLetterIntoArabic(englishLetter, originalText, cursorPosition);

    assert.strictEqual(result.newText, 'همرحبًا، العالم!');
    assert.strictEqual(result.newCursorPosition, 1);
  });

  // Add more test cases as needed
});

describe('LettersFactory', () => {
  it('should update the state with the inserted Arabic letter when a key is pressed', () => {
    const key = 'h';
    const state = {
      textValue: 'مرحبًا، العالم!',
      cursorPosition: 0,
      history: [],
      historyIndex: 0,
      selectedText: '',
    };

    const result = LettersFactory(key, state);

    assert.strictEqual(result.textValue, 'همرحبًا، العالم!');
    assert.strictEqual(result.cursorPosition, 1);
    assert.deepStrictEqual(result.history, [state.textValue]);
  });

  it('should handle deleting selected text before inserting a new letter', () => {
    const key = 'h';
    const state = {
      textValue: 'مرحبًا، العالم!',
      cursorPosition: 0,
      history: [],
      historyIndex: 0,
      selectedText: 'مرحبًا',
    };

    const result = LettersFactory(key, state);

    assert.strictEqual(result.textValue, 'ه، العالم!');
    assert.strictEqual(result.cursorPosition, 1);
    assert.deepStrictEqual(result.history, [state.textValue]);
  });

  // Add more test cases as needed
});