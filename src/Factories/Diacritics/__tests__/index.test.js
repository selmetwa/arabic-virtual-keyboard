import { assert } from '@esm-bundle/chai';

import { convertValidKey, handleDeleteText, insertDiacriticMarkIntoArabic } from '../index.js';

describe('Arabic Diacritical Marks', () => {
  describe('convertValidKey', () => {
    it('should return "an=" for valid keys', () => {
      assert.strictEqual(convertValidKey('n', 'a'), 'an=');
    });

    it('should return "un=" for valid keys', () => {
      assert.strictEqual(convertValidKey('n', 'u'), 'un=');
    });

    it('should return "in=" for valid keys', () => {
      assert.strictEqual(convertValidKey('n', 'i'), 'in=');
    });

    it('should return "s=" for valid keys', () => {
      assert.strictEqual(convertValidKey('s', 'x'), 's=');
    });

    it('should return "h=" for valid keys', () => {
      assert.strictEqual(convertValidKey('h', 'x'), 'h=');
    });

    it('should return "i=" for valid keys', () => {
      assert.strictEqual(convertValidKey('i', 'x'), 'i=');
    });

    it('should return "u=" for valid keys', () => {
      assert.strictEqual(convertValidKey('u', 'x'), 'u=');
    });

    it('should return "a=" for valid keys', () => {
      assert.strictEqual(convertValidKey('a', 'x'), 'a=');
    });

    it('should return empty string for invalid keys', () => {
      assert.strictEqual(convertValidKey('x', 'y'), '');
    });
  });
});