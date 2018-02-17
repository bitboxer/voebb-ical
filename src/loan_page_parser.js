import cheerio from 'cheerio';

function fixBookTitle(title) {
  title = title.html().replace(/<br>/g, "\n").trim();
  return cheerio(`<body>${title}</body>`).text();
}

function parseDate(date) {
  let parts = date.match(/(\d+)/g);
  return new Date(parts[2], parts[1]-1, parts[0]);
}

export default function(html) {
  let page = cheerio.load(html);

  let rows = page('.rTable_table tbody').find('tr');

  let result = Array.from(rows).map(function(row) {
    let tds = cheerio(row).find('td');
    return {
      date: parseDate(cheerio(tds[1]).text().trim()),
      location: cheerio(tds[2]).text().trim(),
      book: fixBookTitle(cheerio(tds[3]))
    };
  });

  return result;
}
