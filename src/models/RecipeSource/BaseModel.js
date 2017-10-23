const http = require('http');

class BaseModel {
  static get(options) {
    return new Promise((resolve, reject) => {
      try {
        const req = http.request(options, (res) => {
          const chunks = [];
          res
            .on('data', chunk => chunks.push(chunk))
            .on('end', () => {
              const body = Buffer.concat(chunks);
              return resolve(body.toString());
            })
            .on('error', err => reject(err));
        });
        req.end();
      } catch (err) {
        return reject(err);
      }
    });
  }
}

module.exports = BaseModel;
