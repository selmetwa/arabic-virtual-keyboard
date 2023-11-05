import { expect } from '@esm-bundle/chai';
import { handleDeleteText, deleteSelectedText } from '../../helpers/delete';

describe('handleDeleteText function', () => {
  it('should delete Arabic numbers and return the new text and cursor position', () => {
    const textarea = document.createElement('textarea');
    textarea.value = '١٢٣٤٥٦٧٨٩٠';

    textarea.setSelectionRange(4, 8); // Selects '٥٦٧٨'

    const { cursorPosition, newText } = handleDeleteText(textarea);

    expect(newText).to.equal('١٢٣٤٩٠'); // Text after deletion
    expect(cursorPosition).to.equal(4); // New cursor position after deletion
  });

  it('should handle no Arabic numbers selected', () => {
    const textarea = document.createElement('textarea');
    textarea.value = '١٢٣٤٥٦٧٨٩٠';

    textarea.setSelectionRange(0, 0); // No text selected

    const { cursorPosition, newText } = handleDeleteText(textarea);

    expect(newText).to.equal('١٢٣٤٥٦٧٨٩٠'); // Text remains unchanged
    expect(cursorPosition).to.equal(0); // Cursor position remains at the beginning
  });
});

describe('deleteSelectedText function with Arabic numbers', () => {
  it('should delete Arabic numbers from the input text', () => {
    const inputText = '١٢٣٤٥٦٧٨٩٠';
    const selectedText = '٥٦٧';

    const newText = deleteSelectedText(inputText, selectedText);
    
    expect(newText).to.equal('١٢٣٤٨٩٠');
  });

  it('should handle deletion of entire text', () => {
    const inputText = '١٢٣٤٥٦٧٨٩٠';
    const selectedText = '١٢٣٤٥٦٧٨٩٠';

    const newText = deleteSelectedText(inputText, selectedText);
    
    expect(newText).to.equal('');
  });

  it ('should handle no selected text', () => {
    const inputText = '١٢٣٥٦٠'
    const selectedText = '';

    const newText = deleteSelectedText(inputText, selectedText);
    expect(newText).to.equal('١٢٣٥٦٠');
  });
});