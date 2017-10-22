const Logger = require('../helpers/Logger');
const SearchService = require('../services/SearchService');

class SearchController {
  static list(req, res) {
    const { source } = req.params;
    const { ingredients, offset } = req.query;

    SearchService.list(source, ingredients, offset)
      .then((rows) => {
        res.send(rows);
      })
      .catch((err) => {
        Logger.throw(res, '3272358416', err);
      });
  }
}

module.exports = SearchController;
