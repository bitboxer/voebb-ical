import Koa from 'koa';

import fetchLoanPage from './fetch_loan_page'
import loanPageParser from './loan_page_parser';
import ical from './ical';

const app = module.exports = new Koa();

app.use(async function(ctx) {
  const loanPage = await fetchLoanPage(process.env.VOEBB_ID, process.env.VOEBB_PASSWORD);
  const books = loanPageParser(loanPage);
  const ics = ical(books);

  ctx.body = ics;
});

app.listen(4000);
