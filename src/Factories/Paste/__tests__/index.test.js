import { assert } from '@esm-bundle/chai';

import { PasteFactory } from '../index.js';

describe('PasteFactory', () => {
  it('should update the state for pasting text', () => {
    const state = {
      textValue: 'شريف المتولي',
      cursorPosition: 2,
      selectedText: '',
      history: [],
      historyIndex: 0,
    };

    const result = PasteFactory('H', state);

    assert.strictEqual(result.textValue, 'شرحيف المتولي');
    assert.strictEqual(result.cursorPosition, 3);
    assert.strictEqual(result.selectedText, '');
  });

  it('should paste numbers correctly to end of text', () => {
    const state = {
      textValue: 'اسداسداسداسداسد',
      cursorPosition: 15,
      selectedText: '',
      history: [],
      historyIndex: 0,
    };

    const result = PasteFactory('123', state);

    assert.strictEqual(result.textValue, 'اسداسداسداسداسد١٢٣');
    assert.strictEqual(result.cursorPosition, 18);
    assert.strictEqual(result.selectedText, '');
  });

  it('Should paste a mix of letters and numbers correctly to the beginning of text', () => {
    const state = {
      textValue: 'اسد',
      cursorPosition: 0,
      selectedText: '',
      history: [],
      historyIndex: 0,
    };

    const result = PasteFactory('123TZHa', state);

    assert.strictEqual(result.textValue, '١٢٣طظحااسد');
    assert.strictEqual(result.cursorPosition, 7);
    assert.strictEqual(result.selectedText, '');
  })
});