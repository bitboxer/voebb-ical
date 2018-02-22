import fetchCookie from 'fetch-cookie/node-fetch';
import f from 'node-fetch';
const fetch = fetchCookie(f);

require('babel-polyfill');

function loadUrl(url, cookie) {
  return (async function () {
    try {
      const res = await fetch(url, { cookie: cookie });
      const setCookie = res.headers.get('set-cookie');
      const body = await res.text();
      return { cookie: setCookie, body: body };
    } catch (e) {
      console.log(e);
    }
  })();
}

export default function(username, password) {
  loadUrl('https://www.voebb.de', '').then(result => {
    console.log(result.body);
  });
}
