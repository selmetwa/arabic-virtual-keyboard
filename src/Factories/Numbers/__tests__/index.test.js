import { assert } from '@esm-bundle/chai';
import { insertEnglishNumberIntoArabic, NumbersFactory } from '../index'

describe('insertEnglishNumberIntoArabic', () => {
  it('should insert Arabic number for Arabic number at the cursor position', () => {
    const englishNumber = '5';
    const originalText = '١٢٣٤٥٦.';
    const cursorPosition = 6;

    const result = insertEnglishNumberIntoArabic(englishNumber, originalText, cursorPosition);

    assert.deepStrictEqual(result, {
      newText: '١٢٣٤٥٦٥.',
      newCursorPosition: cursorPosition + 1,
    });
  });

  it('should handle insertion at the beginning of the text', () => {
    const englishNumber = '2';
    const originalText = '٧٨٩١٢٣٤٥.';
    const cursorPosition = 0;

    const result = insertEnglishNumberIntoArabic(englishNumber, originalText, cursorPosition);

    assert.deepStrictEqual(result, {
      newText: '٢٧٨٩١٢٣٤٥.',
      newCursorPosition: cursorPosition + 1,
    });
  });

  it('should handle insertion at the end of the text', () => {
    const englishNumber = '9';
    const originalText = '١٢٣٤٥٦٧٨.';
    const cursorPosition = originalText.length;

    const result = insertEnglishNumberIntoArabic(englishNumber, originalText, cursorPosition);

    assert.deepStrictEqual(result, {
      newText: '١٢٣٤٥٦٧٨.٩',
      newCursorPosition: cursorPosition + 1,
    });
  });

  it('should not insert anything if Arabic number is not found', () => {
    const englishNumber = '10';
    const originalText = '١٢٣٤٥';
    const cursorPosition = 5;

    const result = insertEnglishNumberIntoArabic(englishNumber, originalText, cursorPosition);

    assert.deepStrictEqual(result, {
      newText: originalText,
      newCursorPosition: cursorPosition,
    });
  });
});

describe('NumbersFactory', () => {
  it('should insert English number into Arabic text and update state', () => {
    const key = '2';
    const state = {
      textValue: '١٢٣',
      cursorPosition: 0,
      history: [],
      selectedText: '',
    };

    const result = NumbersFactory(key, state);

    assert.deepStrictEqual(result, {
      textValue: '٢١٢٣',
      historyIndex: 0,
      history: ['١٢٣'],
      cursorPosition: 1,
      selectedText: '',
    });
  });

  it('should insert English number into empty text and update state', () => {
    const key = '1';
    const state = {
      textValue: '',
      cursorPosition: 0,
      history: [],
      selectedText: '',
    };

    const result = NumbersFactory(key, state);

    assert.deepStrictEqual(result, {
      textValue: '١',
      historyIndex: 0,
      history: [''],
      cursorPosition: 1,
      selectedText: '',
    });
  });

  it('should insert English number the middle of the text and update state', () => {
    const key = '0';
    const state = {
      textValue: '٥٥٥٥٥',
      cursorPosition: 3,
      history: [],
      selectedText: '',
    };

    const result = NumbersFactory(key, state);

    assert.deepStrictEqual(result, {
      textValue: '٥٥٥٠٥٥',
      historyIndex: 0,
      history: ['٥٥٥٥٥'],
      cursorPosition: 4,
      selectedText: '',
    });
  });

  it('should insert delete selected text and correctly insert the english number', () => {
    const key = '1';
    const state = {
      textValue: '١٢٣٥٥',
      cursorPosition: 0,
      history: [],
      selectedText: '١٢٣',
    };

    const result = NumbersFactory(key, state);

    assert.deepStrictEqual(result, {
      textValue: '١٥٥',
      historyIndex: 0,
      history: ['١٢٣٥٥'],
      cursorPosition: 1,
      selectedText: '',
    });
  });
});