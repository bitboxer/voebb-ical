import 'babel-polyfill';
import cheerio from 'cheerio';
import FormData from 'form-data';
import fetchCookie from 'fetch-cookie/node-fetch';
import f from 'node-fetch';

const fetchWithCookie = fetchCookie(f);

function loadUrl(fetch, url, cookie) {
  return (async function load() {
    try {
      const res = await fetch(url, { cookie });
      const setCookie = res.headers.get('set-cookie');
      const body = await res.text();
      return { cookie: setCookie, body };
    } catch (e) {
      return { cookie: '', body: '' };
    }
  }());
}

function postForm(fetch, url, cookie, form) {
  return (async function load() {
    try {
      const res = await fetch(url, { cookie, method: 'POST', body: form });
      const setCookie = res.headers.get('set-cookie');
      const body = await res.text();
      return { cookie: setCookie, body };
    } catch (e) {
      return { cookie: '', body: '' };
    }
  }());
}

function extractFormData(body) {
  const page = cheerio.load(body);
  const form = new FormData();
  const path = page("form[name='Form0']").attr('action');

  page("form[name='Form0'] input[type='hidden']").each((i, input) => {
    const element = cheerio(input);
    form.append(element.attr('name'), element.attr('value'));
  });

  return { form, path };
}

function loadLandingPage(fetch) {
  return loadUrl(fetch, 'https://www.voebb.de', '');
}

function loadLoginPage(fetch, result) {
  const page = cheerio.load(result.body);
  const link = page('#unav ul li a')[0];
  const href = cheerio(link).attr('href');
  return loadUrl(fetch, `https://www.voebb.de/${href}`, result.cookie);
}

function login(fetch, result, username, password) {
  const formdata = extractFormData(result.body);
  const { form } = formdata;
  form.append('$Textfield', username);
  form.append('$Textfield$0', password);
  return postForm(fetch, `https://www.voebb.de${formdata.path}`, result.cookie, form);
}

function pressOkayButton(fetch, result) {
  const formdata = extractFormData(result.body);

  if (result.body.includes('Sie sind angemeldet. Achtung: Vergessen')) {
    return postForm(fetch, `https://www.voebb.de${formdata.path}`, result.cookie, formdata.form);
  }
  return new Promise(((resolve, reject) => {
    reject(new Error('Login failed. Please check username and password.'));
  }));
}

function openMyAccount(fetch, result) {
  const page = cheerio.load(result.body);
  const link = page('#unav ul li a')[2];
  const href = cheerio(link).attr('href');
  return loadUrl(fetch, `https://www.voebb.de/${href}`, result.cookie);
}

function getLoanPage(fetch, result) {
  const page = cheerio.load(result.body);
  const link = page("a[fld='RGLINK_1']")[0];
  const href = cheerio(link).attr('href');
  return loadUrl(fetch, `https://www.voebb.de/${href}`, result.cookie);
}

function fetchBody(result) {
  return new Promise(((resolve) => {
    resolve(result.body);
  }));
}

export default function (username, password, fetchInstance) {
  const fetcher = fetchInstance || fetchWithCookie;
  return loadLandingPage(fetcher)
    .then(result => loadLoginPage(fetcher, result))
    .then(result => login(fetcher, result, username, password))
    .then(result => pressOkayButton(fetcher, result))
    .then(result => openMyAccount(fetcher, result))
    .then(result => getLoanPage(fetcher, result))
    .then(result => fetchBody(result));
}
