import { assert } from '@esm-bundle/chai';
import { MouseCutFactory } from "../index.js";

describe('MouseCutFactory', () => {
  it('should update the state for cutting text with the mouse', () => {
    const state = {
      textValue: 'اسد',
      cursorPosition: 2,
      selectedText: 'د',
    };

    const result = MouseCutFactory(state);

    assert.strictEqual(result.copiedText, 'د');
    assert.strictEqual(result.textValue, 'اس');
    assert.strictEqual(result.cursorPosition, 1);
    assert.strictEqual(result.selectedText, '');
  });
});