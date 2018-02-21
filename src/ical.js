import icalToolkit from 'ical-toolkit';
import moment from 'moment';

export default function(books) {
  let builder = icalToolkit.createIcsFileBuilder();

  builder.calname = 'Vöbb Kalender';

  for (let book of books) {
    let dueSoonDate = moment(book.date).subtract(3, 'days').toDate();

    builder.events.push({
      start: dueSoonDate,
      end: dueSoonDate,
      allDay: true,
      summary: `Due soon: ${book.book}`,
      description: `This book is due on ${moment(book.date).format("YYYY-MM-DD")}`,
      location: book.location
    });

    builder.events.push({
      start: book.date,
      end: book.date,
      allDay: true,
      summary: book.book,
      location: book.location
    });
  }

  return builder.toString();
}
