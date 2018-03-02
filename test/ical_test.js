import fs from 'fs';
import { expect } from 'chai';

import ical from '../src/ical.mjs';

function cleanupIcal(icalString) {
  return icalString.replace(/UID:.*/g, '').replace(/DTSTAMP:.*/g, '');
}

describe('iCal', () => {
  it('should return an ical for two books', () => {
    const ics = cleanupIcal(fs.readFileSync('./test/data/loans.ics').toString().trim());

    const books = [{
      book: 'Geisel : [Comic] / Guy Delisle ; [aus dem Französischem von Heike Drescher ; Textbearbeitung: Ulrich Pröfrock]\nComic Deli\n03825165458',
      date: new Date(Date.UTC(2018, 2, 3)),
      location: 'Friedrichshain - Kreuzberg: Bibliothek Frankfurter Allee 14a',
    }, {
      book: 'Aufzeichnungen aus Birma : [Comic] / Guy Delisle. [Aus dem Franz. von Kai Wilksen]\nComic Deli\n02184346458',
      date: new Date(Date.UTC(2018, 2, 3)),
      location: 'Friedrichshain - Kreuzberg: Bibliothek Frankfurter Allee 14a',
    },
    ];

    const result = cleanupIcal(ical(books));
    expect(result).to.eql(ics);
  });
});
