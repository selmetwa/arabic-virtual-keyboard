/**
 * @param {key} string - The key pressed.
 * @returns {boolean} - True if the key pressed is a a right arrow, false otherwise.
 */
export const isRightArrow = (key) => {
  return key === 'ArrowRight';
}

/**
 * @param {key} string - The key pressed.
 * @returns {boolean} - True if the key pressed is a a left arrow, false otherwise.
 */
export const isLeftArrow = (key) => {
  return key === 'ArrowLeft';
}