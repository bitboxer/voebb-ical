import cheerio from 'cheerio';

function fixBookTitle(title) {
  const cleanedTitle = title.html().replace(/<br>/g, '\n').trim();
  return cheerio(`<body>${cleanedTitle}</body>`).text();
}

function parseDate(date) {
  const parts = date.match(/(\d+)/g);
  return new Date(Date.UTC(parts[2], parts[1] - 1, parts[0]));
}

export default function (html) {
  const page = cheerio.load(html);

  const rows = page('.rTable_table tbody').find('tr');

  const result = Array.from(rows).map((row) => {
    const tds = cheerio(row).find('td');
    return {
      date: parseDate(cheerio(tds[1]).text().trim()),
      location: cheerio(tds[2]).text().trim(),
      book: fixBookTitle(cheerio(tds[3])),
    };
  });

  return result;
}
