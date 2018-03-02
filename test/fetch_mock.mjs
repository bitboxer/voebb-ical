export default class FetchMock {
  constructor() {
    this.results = [];
  }

  addPage(page) {
    this.results.push(page);
  }

  fetch(url, opts) {
    const self = this;
    return new Promise(((resolve, reject) => {
      resolve({
        headers: {
          get(param) {
            return 'none';
          },
        },
        text() {
          return new Promise(((resolve, reject) => {
            resolve(self.results.shift());
          }));
        },
      });
    }));
  }
}
