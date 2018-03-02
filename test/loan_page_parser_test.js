import fs from 'fs';
import { expect } from 'chai';

import loanPageParser from '../src/loan_page_parser.mjs';

describe('LoanPageParser', () => {
  it('should return two books', () => {
    const html = fs.readFileSync('./test/data/loans.html').toString();
    const result = loanPageParser(html);
    expect(result).to.eql([{
      book: 'Geisel : [Comic] / Guy Delisle ; [aus dem Französischem von Heike Drescher ; Textbearbeitung: Ulrich Pröfrock]\nComic Deli\n03825165458',
      date: new Date(Date.UTC(2018, 2, 3)),
      location: 'Friedrichshain - Kreuzberg: Bibliothek Frankfurter Allee 14a',
    }, {
      book: 'Aufzeichnungen aus Birma : [Comic] / Guy Delisle. [Aus dem Franz. von Kai Wilksen]\nComic Deli\n02184346458',
      date: new Date(Date.UTC(2018, 2, 3)),
      location: 'Friedrichshain - Kreuzberg: Bibliothek Frankfurter Allee 14a',
    },
    ]);
  });

  it('should return an empty list if the html is empty', () => {
    const result = loanPageParser('');
    expect(result).to.eql([]);
  });

  xit('should return an empty list if the table is empty', () => {
  });
});
