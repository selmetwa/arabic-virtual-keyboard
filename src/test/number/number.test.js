import { expect } from '@esm-bundle/chai';
import { numbers } from '../../constants/data.js';
import { isNumber, numberFactory } from '../../helpers/number.js';

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

describe('numberFactory function', () => {
  it('should return the corresponding Arabic number based on the English number input', () => {
    const englishNumber = '1';
    const expectedArabicNumber = '\u0661';

    const arabicNumber = numberFactory(englishNumber);

    expect(arabicNumber).to.equal(expectedArabicNumber);
  });

  it('should handle a non-existing English number', () => {
    const englishNumber = '10';

    const arabicNumber = numberFactory(englishNumber);

    expect(arabicNumber).to.be.undefined;
  });

  it('should handle empty input', () => {
    const englishNumber = '';

    const arabicNumber = numberFactory(englishNumber);

    expect(arabicNumber).to.be.undefined;
  });

  it('should return undefined for undefined input', () => {
    const englishNumber = undefined;

    const arabicNumber = numberFactory(englishNumber);

    expect(arabicNumber).to.be.undefined;
  });

  it('should return the corresponding Arabic number for each English number', () => {
    numbers.forEach(number => {
      const arabicNumber = numberFactory(number.en);
      expect(arabicNumber).to.equal(number.ar);
    });
  });
});