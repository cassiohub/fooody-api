const Logger = require('../helpers/Logger');
const FoodService = require('../services/FoodService');

class FoodController {
  static list(req, res) {
    const { name } = req.query;

    FoodService.list(name)
      .then((rows) => {
        res.send(rows);
      })
      .catch((err) => {
        Logger.throw(res, '3272358416', err);
      });
  }
}

module.exports = FoodController;
