import { expect } from '@esm-bundle/chai';
import { deleteFromTextInput } from '../../helpers/delete'

describe('deleteFromTextInput', () => {
  it('should delete the last character from the input string', () => {
    const input = '12345'
    const expectedOutput = '1234'
    expect(deleteFromTextInput(input)).to.be.eql(expectedOutput)
  })

  it('should delete the last character from the arabic input string', () => {
    const input = '١٢٣٤٥'
    const expectedOutput = '١٢٣٤'
    expect(deleteFromTextInput(input)).to.be.eql(expectedOutput)
  })

  it ('should delete empty spaces', () => {
    const input = '   '
    const afterOneDelete = '  '
    const afterTwoDelete = ' '
    const afterThreeDelete = ''
    expect(deleteFromTextInput(input)).to.be.eql(afterOneDelete)
    expect(deleteFromTextInput(afterOneDelete)).to.be.eql(afterTwoDelete)
    expect(deleteFromTextInput(afterTwoDelete)).to.be.eql(afterThreeDelete)
  })

  it('should return an empty string if the input string is only one character long', () => {
    const input = '1'
    const expectedOutput = ''
    expect(deleteFromTextInput(input)).to.be.eql(expectedOutput)
  })

  it('should return an empty string if the input string is already empty', () => {
    const input = ''
    const expectedOutput = ''
    expect(deleteFromTextInput(input)).to.be.eql(expectedOutput)
  })

  it('should return an empty string if the input string is undefined', () => {
    const input = undefined
    const expectedOutput = ''
    expect(deleteFromTextInput(input)).to.be.eql(expectedOutput)
  })

  it('should return an empty string if the input string is null', () => {
    const input = null
    const expectedOutput = ''
    expect(deleteFromTextInput(input)).to.be.eql(expectedOutput)
  })
})
