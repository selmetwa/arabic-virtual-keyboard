import { assert } from '@esm-bundle/chai';
import { insertEnglishNumberIntoArabic } from '../index'

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