import loanPageParser from '../src/loan_page_parser';

const expect = require('chai').expect;

describe('First test', () => {
  it('Should assert true to be true', () => {
    console.log(loanPageParser());
    expect(true).to.be.true;
  });
});
