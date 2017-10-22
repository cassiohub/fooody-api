const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class FavoriteSchema extends RouteValidator {
  static get list() {
    const schema = {};

    return this.validate(schema);
  }

  static get get() {
    const schema = {
      params: Joi.object().keys({
        favoriteId: Joi.number().integer().required(),
      }),
    };

    return this.validate(schema);
  }

  static get post() {
    const schema = {
      body: Joi.object().keys({
        link: Joi.string().required(),
        name: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }

  static get put() {
    const schema = {
      params: Joi.object().keys({
        favoriteId: Joi.number().integer().required(),
      }),
      body: Joi.object().keys({
        link: Joi.string(),
        name: Joi.string(),
        enabled: Joi.number().integer().allow(0, 1, null),
      }),
    };

    return this.validate(schema);
  }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        favoriteId: Joi.number().integer().required(),
      }),
    };

    return this.validate(schema);
  }
}

module.exports = FavoriteSchema;
