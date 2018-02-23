import Koa from 'koa';
import Router from 'koa-router';

import fetchLoanPage from './fetch_loan_page'
import loanPageParser from './loan_page_parser';
import ical from './ical';

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = "Welcome to the Voebb Ical feed :)";
});

router.get(`/feed/${process.env.VOEBB_TOKEN}`, async (ctx, next) => {
  const loanPage = await fetchLoanPage(process.env.VOEBB_ID, process.env.VOEBB_PASSWORD);
  const books = loanPageParser(loanPage);
  const ics = ical(books);

  ctx.type = "text/calendar";
  ctx.body = ics;
}); 

app
  .use(router.routes())
  .listen(4000);
