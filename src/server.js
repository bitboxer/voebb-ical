import Koa from 'koa';
import Router from 'koa-router';

import fetchLoanPage from './fetch_loan_page.mjs';
import loanPageParser from './loan_page_parser.mjs';
import ical from './ical.mjs';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Welcome to the Voebb Ical feed :)';
});

router.get(`/feed/${process.env.VOEBB_TOKEN}`, async (ctx) => {
  try {
    const loanPage = await fetchLoanPage(process.env.VOEBB_ID || '', process.env.VOEBB_PASSWORD || '');
    const books = loanPageParser(loanPage);
    const ics = ical(books);

    ctx.type = 'text/calendar';
    ctx.body = ics;
  } catch (e) {
    ctx.body = `Error: ${e}`;
  }
});

app
  .use(router.routes())
  .listen(process.env.PORT || 4000);
