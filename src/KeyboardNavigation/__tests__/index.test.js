import { assert } from '@esm-bundle/chai';
import { KeyboardNavigationFactory } from '../index.js';

describe('KeyboardNavigationFactory', () => {
  it('should handle left arrow key when cursor is not at the end', () => {
    const state = { cursorPosition: 2, textValue: '١٢٣ابت' };
    const result = KeyboardNavigationFactory('ArrowLeft', state);
    assert.deepStrictEqual(result, { cursorPosition: 3, previousKey: 'ArrowLeft', selectedText: '' });
  });

  it('should handle right arrow key when cursor is not at the beginning', () => {
    const state = { cursorPosition: 3, textValue: '١٢٣ابت' };
    const result = KeyboardNavigationFactory('ArrowRight', state);
    assert.deepStrictEqual(result, { cursorPosition: 2, previousKey: 'ArrowRight', selectedText: '' });
  });

  it('should not move cursor when other keys are pressed', () => {
    const state = { cursorPosition: 2, textValue: '١٢٣ابت' };
    const result = KeyboardNavigationFactory('ا', state); // Arabic letter
    assert.deepStrictEqual(result, { cursorPosition: 2, previousKey: 'ا', selectedText: '' });
  });

  it('should not move cursor when left arrow key is pressed at the end', () => {
    const state = { cursorPosition: 7, textValue: '١٢٣ابت' };
    const result = KeyboardNavigationFactory('ArrowLeft', state);
    assert.deepStrictEqual(result, { cursorPosition: 7, previousKey: 'ArrowLeft', selectedText: '' });
  });

  it('should not move cursor when right arrow key is pressed at the beginning', () => {
    const state = { cursorPosition: 0, textValue: '١٢٣ابت' };
    const result = KeyboardNavigationFactory('ArrowRight', state);
    assert.deepStrictEqual(result, { cursorPosition: 0, previousKey: 'ArrowRight', selectedText: '' });
  });
});