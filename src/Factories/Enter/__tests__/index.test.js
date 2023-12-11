import { assert } from '@esm-bundle/chai';
import { EnterFactory } from '../index.js';

describe('EnterFactory', () => {
  it('should insert a new line into text and update cursor position', () => {
    const state = {
      textValue: 'مرحبا ١٢٣',
      cursorPosition: 7,
      history: [],
      historyIndex: 0,
      selectedText: '',
    };

    const textarea = {
      setSelectionRange: (start, end) => {
        // Mocking setSelectionRange
        assert.strictEqual(start, state.cursorPosition + 1);
        assert.strictEqual(end, state.cursorPosition + 1);
      },
    };

    const result = EnterFactory(state, textarea);

    assert.strictEqual(result.textValue, 'مرحبا ١\n٢٣');
    assert.strictEqual(result.cursorPosition, 8);
    assert.strictEqual(result.historyIndex, 0);
    assert.deepStrictEqual(result.history, ['مرحبا ١٢٣']);
    assert.strictEqual(result.selectedText, '');
  });

  it('should handle inserting a new line into an empty string', () => {
    const state = {
      textValue: '',
      cursorPosition: 0,
      history: [],
      historyIndex: 0,
      selectedText: '',
    };

    const textarea = {
      setSelectionRange: (start, end) => {
        // Mocking setSelectionRange
        assert.strictEqual(start, state.cursorPosition + 1);
        assert.strictEqual(end, state.cursorPosition + 1);
      },
    };

    const result = EnterFactory(state, textarea);

    assert.strictEqual(result.textValue, '\n');
    assert.strictEqual(result.cursorPosition, 1);
    assert.strictEqual(result.historyIndex, 0);
    assert.deepStrictEqual(result.history, ['']);
    assert.strictEqual(result.selectedText, '');
  });
});