const DeCasaModel = require('./DeCasaModel');
const TudoGostosoModel = require('./TudoGostosoModel');

class OmniModel {
  static list(ingredients, offset) {
    return new Promise((resolve) => {
      return Promise.all([
        TudoGostosoModel.list(ingredients, offset),
        DeCasaModel.list(ingredients, offset),
      ])
        .then((results) => {
          return resolve(results.reduce((p, c) => p.concat(c), []));
        });
    });
  }
}

module.exports = OmniModel;
