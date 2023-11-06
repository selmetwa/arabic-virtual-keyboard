import { expect } from '@esm-bundle/chai';

import { isLetter, letterFactory } from '../../helpers/letter';

describe('isLetter Function', () => {
  it('should return true for lowercase letters', () => {
    expect(isLetter('a')).to.be.true;
    expect(isLetter('z')).to.be.true;
  });

  it('should return true for uppercase letters', () => {
    expect(isLetter('A')).to.be.true;
    expect(isLetter('Z')).to.be.true;
  });

  it('should return false for non-letter characters', () => {
    expect(isLetter('5')).to.be.false;
    expect(isLetter('%')).to.be.false;
    expect(isLetter('@')).to.be.false;
    expect(isLetter(' ')).to.be.false;
    expect(isLetter('')).to.be.false;
    expect(isLetter(undefined)).to.be.false;
    expect(isLetter(null)).to.be.false;
  });

  it('should return false for multiple characters', () => {
    expect(isLetter('ab')).to.be.false;
    expect(isLetter('A5')).to.be.false;
    expect(isLetter('BCD')).to.be.false;
  });
});

describe('letterFactory function', () => {
  it('Should return corresponding Arabic letter for a valid English letter', () => {
    // Test with a known English letter 'a'
    const result = letterFactory('a');
    const expected = 'ا'; // Corresponding Arabic letter for 'a'
    expect(result).to.equal(expected);
  });

  it('Should handle every english letter', () => {
    const englishLetters = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
      'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
      's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    englishLetters.forEach((englishLetter) => {
      const result = letterFactory(englishLetter);
      expect(result).to.not.equal('');
    });
  })

  it('Should handle every uppercase english letter', () => {
    const englishLetters = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
      'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', "X", 'Y', 'Z'
    ];

    englishLetters.forEach((englishLetter) => {
      const result = letterFactory(englishLetter);
      expect(result).to.not.equal('');
    });
  })

  it('Should return correct Arabic letter for a letter with multiple corresponding sounds in English', () => {
    const lettersForYa = ["y", "Y", "i", "I", 'e', 'E']
    const arabicLetter = 'ي';
    lettersForYa.forEach((letter) => {
      const result = letterFactory(letter);
      expect(result).to.equal(arabicLetter);
    });

    const lettersForWaw = ["w", 'W', "o", "O", 'u', 'U'];
    const arabicLetterForWaw = 'و';
    lettersForWaw.forEach((letter) => {
      const result = letterFactory(letter);
      expect(result).to.equal(arabicLetterForWaw);
    });
  });
  it('Should return correct Arabic letter for a letter with no corresponding sound in English', () => {
    // Test with a letter 'H' which has no corresponding sound in English
    const result = letterFactory('H');
    const expected = 'ح'; // Corresponding Arabic letter for 'H'
    expect(result).to.equal(expected);
  });

  it('Should return undefined for empty input', () => {
    const result = letterFactory('');
    expect(result).to.equal('');
  });

  it('Should return undefined for undefined input', () => {
    const result = letterFactory(undefined);
    expect(result).to.equal('');
  });

  it('Should return undefined for null input', () => {
    const result = letterFactory(null);
    expect(result).to.equal('');
  });

  it('Should return undefined for multiple characters', () => {
    const result = letterFactory('ab');
    expect(result).to.equal('');
  });
});