import fetchCookie from 'fetch-cookie/node-fetch';
import f from 'node-fetch';
let fetch = fetchCookie(f);

function loadUrl(url, cookie) {
  let setCookie = cookie;

  fetch('https://www.voebb.de/', {})
    .then(response => {
      setCookie = response.headers['set-cookie'];
      return response.text();
    }).then(body => {
      console.log(body);
    }).catch(error => {
      console.log(error);
    });

  console.log(setCookie);
}

export default function(username, password) {
  loadUrl("https://www.voebb.de", "old");
}
