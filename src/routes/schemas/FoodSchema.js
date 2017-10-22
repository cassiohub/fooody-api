const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class FoodSchema extends RouteValidator {
  static get list() {
    const schema = {
      query: Joi.object().keys({
        name: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }
}

module.exports = FoodSchema;
