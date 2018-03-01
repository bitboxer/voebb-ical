export default class FetchMock {
  constructor() {
    this.results = []
  }

  addPage(page) {
    this.results.push(page);
  }

  fetch(url, opts) {
    let self = this;
    return new Promise(function(resolve, reject) {
      resolve({
        headers: {
          get: function(param) {
            return 'none';
          }
        },
        text: function() {
          return new Promise(function(resolve, reject) {
            resolve(self.results.shift());
          });
        }
      });
    });
  }
}
