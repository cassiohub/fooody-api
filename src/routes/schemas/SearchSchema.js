const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class SearchSchema extends RouteValidator {
  static get list() {
    const schema = {
      params: Joi.object().keys({
        source: Joi.string().required(),
      }),
      query: Joi.object().keys({
        ingredients: Joi.string().required(),
        offset: Joi.number().integer(),
      }),
    };

    return this.validate(schema);
  }
}

module.exports = SearchSchema;
