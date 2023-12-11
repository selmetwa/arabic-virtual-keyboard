import { assert } from '@esm-bundle/chai';
import { KeyboardNavigationFactory } from '../index';
import { getNextLineStart, getLineStart, generateRowIndices, getCurrentRow } from '../helpers';

describe('KeyboardNavigationFactory', () => {
  it('should handle left arrow key when cursor is not at the end', () => {
    const textarea = document.createElement('textarea');
    const state = { cursorPosition: 2, textValue: '١٢٣ابت' };
    const result = KeyboardNavigationFactory('ArrowLeft', state, textarea);
    assert.deepStrictEqual(result, { cursorPosition: 3, selectedText: '' });
  });

  it('should handle right arrow key when cursor is not at the beginning', () => {
    const textarea = document.createElement('textarea');
    const state = { cursorPosition: 3, textValue: '١٢٣ابت' };
    const result = KeyboardNavigationFactory('ArrowRight', state, textarea);
    assert.deepStrictEqual(result, { cursorPosition: 2, selectedText: '' });
  });

  it('should not move cursor when other keys are pressed', () => {
    const textarea = document.createElement('textarea');
    const state = { cursorPosition: 2, textValue: '١٢٣ابت' };
    const result = KeyboardNavigationFactory('ا', state, textarea); // Arabic letter
    assert.deepStrictEqual(result, { cursorPosition: 2, selectedText: '' });
  });

  it('should not move cursor when left arrow key is pressed at the end', () => {
    const textarea = document.createElement('textarea');
    const state = { cursorPosition: 7, textValue: '١٢٣ابت' };
    const result = KeyboardNavigationFactory('ArrowLeft', state, textarea);
    assert.deepStrictEqual(result, { cursorPosition: 7, selectedText: '' });
  });

  it('should not move cursor when right arrow key is pressed at the beginning', () => {
    const textarea = document.createElement('textarea');
    const state = { cursorPosition: 0, textValue: '١٢٣ابت' };
    const result = KeyboardNavigationFactory('ArrowRight', state, textarea);
    assert.deepStrictEqual(result, { cursorPosition: 0, selectedText: '' });
  });
});

describe('getCurrentRow', () => {
  it('should return the correct row for a given cursor position', () => {
    const text = 'This is a sample\nmultiline\ntext.';
    const cursorPosition = 17; // Cursor position within the second line

    const result = getCurrentRow(text, cursorPosition);

    assert.strictEqual(result, 2);
  });

  it('should handle cursor position at the beginning of the text', () => {
    const text = 'First line\nSecond line\nThird line';
    const cursorPosition = 0; // Cursor at the beginning

    const result = getCurrentRow(text, cursorPosition);

    assert.strictEqual(result, 1);
  });

  // Add more test cases as needed
});

describe('generateRowIndices', () => {
  it('should generate row indices correctly', () => {
    const start = 2;
    const end = 6;

    const result = generateRowIndices(start, end);

    assert.deepStrictEqual(result, [6, 3, 4, 5, 2]);
  });

  // Add more test cases as needed
});

describe('getLineStart', () => {
  it('should return the index of the start of the line', () => {
    const cursorPosition = 12; // Cursor position within the second line
    const value = 'This is a sample\nmultiline\ntext.';

    const result = getLineStart(cursorPosition, value);

    assert.strictEqual(result, 0); // Start of the second line
  });

  // Add more test cases as needed
});

describe('getNextLineStart', () => {
  it('should return the index of the start of the next line', () => {
    const cursorPosition = 12; // Cursor position within the second line
    const value = 'This is a sample\nmultiline\ntext.';

    const result = getNextLineStart(cursorPosition, value);

    assert.strictEqual(result, 17); // Start of the third line
  });

  // Add more test cases as needed
});