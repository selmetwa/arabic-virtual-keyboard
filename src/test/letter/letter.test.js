import { expect } from '@esm-bundle/chai';

import { isLetter } from '../../helpers/letter';

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