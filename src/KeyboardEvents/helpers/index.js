export const getCurrentRow = (text, cursorPosition) => {
  const rows = text.split('\n');
  let totalChars = 0;
  let currentRow = 1;

  for (let i = 0; i < rows.length; i++) {
    totalChars += rows[i].length + 1;

    if (totalChars > cursorPosition) {
      currentRow = i + 1;
      break;
    }
  }

  return currentRow;
}

export const generateRowIndices = (start, end) => {
  const result = [];

  for (let i = start + 1; i < end; i++) {
    result.push(i);
  }

  return [end, ...result, start];
}

export const getLineStart = (cursorPosition, value) => {
  const textBeforeCursor = value.substring(0, cursorPosition);
  return textBeforeCursor.lastIndexOf('\n') + 1;
}

export const getNextLineStart = (cursorPosition, value) => {
  const textAfterCursor = value.substring(cursorPosition);
  const nextNewlineIndex = textAfterCursor.indexOf('\n');

  if (cursorPosition === value.length) {
    return cursorPosition + 1;
  }

  if (nextNewlineIndex !== -1) {
    return cursorPosition + nextNewlineIndex + 1;
  }

  // If there is no newline character after the cursor, return the end of the text
  return value.length;
}