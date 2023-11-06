import { expect } from '@esm-bundle/chai';
import { specialLetterFactory, englishLetterFactory } from '../../helpers/letter';

describe('englishLetterFactory function', () => {
  it('Should return corresponding English letter for given Arabic letter', () => {
    expect(englishLetterFactory('د')).to.equal('d');
    expect(englishLetterFactory('ب')).to.equal('b');
    expect(englishLetterFactory('ج')).to.equal('j');
    expect(englishLetterFactory('ك')).to.equal('k');
    expect(englishLetterFactory('ش')).to.equal("s'");
    expect(englishLetterFactory('ط')).to.equal('T');
  });

  it('Should return an empty string if the input has no corresponding English letter', () => {
    expect(englishLetterFactory('')).to.equal('');
    expect(englishLetterFactory(undefined)).to.equal('');
    expect(englishLetterFactory(null)).to.equal('');
    expect(englishLetterFactory('١')).to.equal('');
    expect(englishLetterFactory(' ')).to.equal('');
    expect(englishLetterFactory('        ')).to.equal('');
  });
});

describe('specialLetterFactory function', () => {
  it("Should correctly replace the previous letter if the previous letter + ' is a special case", () => {
    expect(specialLetterFactory('س')).to.equal('ش');
    expect(specialLetterFactory('شت')).to.equal('شث');
    expect(specialLetterFactory('حههههح')).to.equal('حههههخ');
  })
  it("Should return the inputted text if the previous letter + ' is not a special case", () => {
    expect(specialLetterFactory('ب')).to.equal('ب');
    expect(specialLetterFactory('سب')).to.equal('سب');
    expect(specialLetterFactory('حههههب')).to.equal('حههههب');
  })
  it("Should return an empty string if the input is empty", () => {
    expect(specialLetterFactory('')).to.equal('');
  })
  it("Should return an empty string if the input is undefined", () => {
    expect(specialLetterFactory(undefined)).to.equal('');
  })
  it("Should return an empty string if the input is null", () => {
    expect(specialLetterFactory(null)).to.equal('');
  })
})