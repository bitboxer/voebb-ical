import express from 'express';
import fetchLoanPage from '../app/fetch_loan_page';
import loanPageParser from '../app/loan_page_parser';
import ical from '../app/ical';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Welcome to the Voebb iCal feed :)');
});

router.get(`/feed/${process.env.VOEBB_TOKEN}`, async (req, res) => {
  try {
    const loanPage = await fetchLoanPage(
      process.env.VOEBB_ID || '',
      process.env.VOEBB_PASSWORD || '',
    );
    const books = loanPageParser(loanPage);
    const ics = ical(books);

    res.set('Content-Type', 'text/calendar');
    res.send(ics);
  } catch (e) {
    res.sendStatus(400);
  }
});

export default router;
