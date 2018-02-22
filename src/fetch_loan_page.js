import 'babel-polyfill';
import cheerio from 'cheerio';
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
  console.log(result.body);
  //return loadUrl('https://www.voebb.de', result.cookie)
}

export default function(username, password) {
  loadLandingPage()
    .then(loadLoginPage).then(result => {
      return login(result, username, password)
    })
    //.then(pressOkayButton)
    //.then(openMyAccount)
    //.then(getLoanPage)
    //.then(result => {
      //console.log(result.body);
    //});
}
