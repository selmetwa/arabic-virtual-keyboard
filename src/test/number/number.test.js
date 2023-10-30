import { expect } from '@esm-bundle/chai';
import { isNumber } from '../../helpers/number.js';

describe('isNumber', () => {
  it('should return true if the value is a number', () => {
    expect(isNumber('1')).to.be.true;
  });

  it('should return false if the value is not a number', () => {
    expect(isNumber('a')).to.be.false;
  });

  it('should return false if the value is undefined', () => {
    expect(isNumber(undefined)).to.be.false;
  });

  it('should return false if the value is null', () => {
    expect(isNumber(null)).to.be.false;
  });
});