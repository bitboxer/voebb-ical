import 'babel-polyfill';
import cheerio from 'cheerio';
import FormData from 'form-data';
import fetchCookie from 'fetch-cookie/node-fetch';
import f from 'node-fetch';
const fetch = fetchCookie(f);

function loadUrl(url, cookie) {
  return (async function () {
    try {
      const res = await fetch(url, { cookie: cookie });
      const setCookie = res.headers.get('set-cookie');
      const body = await res.text();
      return { cookie: setCookie, body: body };
    } catch (e) {
      return { cookie: "", body: "" };
    }
  })();
}

function postForm(url, cookie, form) {
  return (async function () {
    try {
      const res = await fetch(url, { cookie: cookie, method: 'POST', body: form });
      const setCookie = res.headers.get('set-cookie');
      const body = await res.text();
      return { cookie: setCookie, body: body };
    } catch (e) {
      return { cookie: "", body: "" };
    }
  })();
}

function extractFormData(body) {
  const page = cheerio.load(body);
  const form = new FormData();
  const path = page("form[name='Form0']").attr("action");

  page("form[name='Form0'] input[type='hidden']").each(function(i, input) {
    const element = cheerio(input);
    form.append(element.attr('name'), element.attr('value'));
  });

  return {form: form, path: path}
}

function loadLandingPage() {
  return loadUrl('https://www.voebb.de', '')
}

function loadLoginPage(result) {
  const page = cheerio.load(result.body);
  const link = page("#unav ul li a")[0];
  const href = cheerio(link).attr("href");
  return loadUrl(`https://www.voebb.de/${href}`, result.cookie);
}

function login(result, username, password) {
  const formdata = extractFormData(result.body);
  const form = formdata.form;
  form.append("$Textfield", username);
  form.append("$Textfield$0", password);
  return postForm(`https://www.voebb.de${formdata.path}`, result.cookie, form);
}

function pressOkayButton(result) {
  const formdata = extractFormData(result.body);
  return postForm(`https://www.voebb.de${formdata.path}`, result.cookie, formdata.form);
}

function openMyAccount(result) {
  const page = cheerio.load(result.body);
  const link = page("#unav ul li a")[2];
  const href = cheerio(link).attr("href");
  return loadUrl(`https://www.voebb.de/${href}`, result.cookie);
}

function getLoanPage(result) {
  const page = cheerio.load(result.body);
  const link = page("a[fld='RGLINK_1']")[0];
  const href = cheerio(link).attr("href");
  return loadUrl(`https://www.voebb.de/${href}`, result.cookie);
}

export default function(username, password) {
  return loadLandingPage()
    .then(loadLoginPage)
    .then(result => login(result, username, password))
    .then(pressOkayButton)
    .then(openMyAccount)
    .then(getLoanPage)
    .then(result => {
      return new Promise(function(resolve, reject) {
        resolve(result.body);
      });
    });
}
