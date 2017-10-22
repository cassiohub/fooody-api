const http = require('http');

class BaseModel {
  static get(options) {
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        const chunks = [];
        res
          .on('data', chunk => chunks.push(chunk))
          .on('end', () => {
            const body = Buffer.concat(chunks);
            resolve(body.toString());
          })
          .on('error', err => reject(err));
      });

      req.end();
    });
  }
}

module.exports = BaseModel;
