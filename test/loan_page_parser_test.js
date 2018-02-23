import fs from 'fs';
import { expect } from 'chai';

import loanPageParser from '../src/loan_page_parser';

describe('LoanPageParser', () => {

  it('should return two books', () => {
    let html = fs.readFileSync('./test/data/loans.html').toString();
    let result = loanPageParser(html);
    expect(result).to.eql([{
        book: "Geisel : [Comic] / Guy Delisle ; [aus dem Französischem von Heike Drescher ; Textbearbeitung: Ulrich Pröfrock]\nComic Deli\n03825165458",
        date: new Date(Date.UTC(2018, 2, 3)),
        location: "Friedrichshain - Kreuzberg: Bibliothek Frankfurter Allee 14a"
      }, {
        book: "Aufzeichnungen aus Birma : [Comic] / Guy Delisle. [Aus dem Franz. von Kai Wilksen]\nComic Deli\n02184346458",
        date: new Date(Date.UTC(2018, 2, 3)),
        location: "Friedrichshain - Kreuzberg: Bibliothek Frankfurter Allee 14a"
      }
    ]);
  });

});
