import { assert } from '@esm-bundle/chai';
import { isNumber, deleteSelectedText, isInputArabic } from '../index';

describe('isNumber', () => {
  it('should return true for valid numeric strings', () => {
    assert.strictEqual(isNumber('0'), true);
    assert.strictEqual(isNumber('5'), true);
    assert.strictEqual(isNumber('9'), true);
    assert.strictEqual(isNumber('10'), false); // not a single-digit number
  });

  it('should return true for valid numeric integers', () => {
    assert.strictEqual(isNumber(0), true);
    assert.strictEqual(isNumber(3), true);
    assert.strictEqual(isNumber(9), true);
  });

  it('should return false for non-numeric strings', () => {
    assert.strictEqual(isNumber('abc'), false);
    assert.strictEqual(isNumber('123abc'), false);
    assert.strictEqual(isNumber(''), false);
  });

  it('should return false for non-numeric values', () => {
    assert.strictEqual(isNumber(true), false);
    assert.strictEqual(isNumber(null), false);
    assert.strictEqual(isNumber(undefined), false);
  });
});

describe('deleteSelectedText', () => {
  it('should delete selected text from the middle of the text', () => {
    const textValue = '١٢٣٤٥٦٧٨٩٠ - اختبار';
    const selectedText = '٥٦٧٨٩٠';

    const result = deleteSelectedText(textValue, selectedText);

    assert.strictEqual(result, '١٢٣٤ - اختبار');
  });

  it('should delete selected text from the beginning of the text', () => {
    const textValue = 'اختبار لحذف النص المحدد';
    const selectedText = 'اختبار ';

    const result = deleteSelectedText(textValue, selectedText);

    assert.strictEqual(result, 'لحذف النص المحدد');
  });

  it('should delete selected text from the end of the text', () => {
    const textValue = 'هذا نص للاختبار - ١٢٣٤٥٦٧٨٩';
    const selectedText = ' - ١٢٣٤٥٦٧٨٩';

    const result = deleteSelectedText(textValue, selectedText);

    assert.strictEqual(result, 'هذا نص للاختبار');
  });

  it('should handle deletion of non-existing selected text', () => {
    const textValue = 'لا تغيير هنا.';
    const selectedText = 'غير موجود';

    const result = deleteSelectedText(textValue, selectedText);

    assert.strictEqual(result, textValue);
  });

  it('should handle empty selected text', () => {
    const textValue = 'بعض النص للحذف';
    const selectedText = '';

    const result = deleteSelectedText(textValue, selectedText);

    assert.strictEqual(result, textValue);
  });

  it('should handle empty original text', () => {
    const textValue = '';
    const selectedText = 'اختبار';

    const result = deleteSelectedText(textValue, selectedText);

    assert.strictEqual(result, textValue);
  });

  it('should handle deletion of numbers', () => {
    const textValue = '١٢٣٤٥';
    const selectedText = '٣';

    const result = deleteSelectedText(textValue, selectedText);

    assert.strictEqual(result, '١٢٤٥');
  });
});

describe('isInputArabic', () => {
  it('should return true for a string containing only Arabic letters', () => {
    const arabicText = 'مرحبا';
    assert.strictEqual(isInputArabic(arabicText), true);
  });

  it('should return true for a string containing Arabic numbers', () => {
    const arabicNumbers = '١٢٣٤٥٦٧٨٩٠';
    assert.strictEqual(isInputArabic(arabicNumbers), true);
  });

  it('should return true for a mixed string of Arabic letters and numbers', () => {
    const mixedArabic = 'مرحبا١٢٣٤٥';
    assert.strictEqual(isInputArabic(mixedArabic), true);
  });

  it('should return false for a string containing English letters', () => {
    const englishText = 'Hello';
    assert.strictEqual(isInputArabic(englishText), false);
  });

  it('should return false for a string containing English numbers', () => {
    const englishNumbers = '12345';
    assert.strictEqual(isInputArabic(englishNumbers), false);
  });

  it('should return false for an empty string', () => {
    const emptyString = '';
    assert.strictEqual(isInputArabic(emptyString), false);
  });

  it('should return false for a string with special characters', () => {
    const specialChars = '!@#$%^&*()';
    assert.strictEqual(isInputArabic(specialChars), false);
  });
});