const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class IngredientSchema extends RouteValidator {
  static get list() {
    const schema = {};

    return this.validate(schema);
  }

  static get get() {
    const schema = {
      params: Joi.object().keys({
        ingredientId: Joi.number().integer().required(),
      }),
    };

    return this.validate(schema);
  }

  static get post() {
    const schema = {
      body: Joi.object().keys({
        name: Joi.string().allow(null),
        quantity: Joi.number().integer().min(0).required(),
        unity: Joi.number().integer().min(0).required(),
      }),
    };

    return this.validate(schema);
  }

  static get put() {
    const schema = {
      params: Joi.object().keys({
        ingredientId: Joi.number().integer().required(),
      }),
      body: Joi.object().keys({
        name: Joi.string(),
        quantity: Joi.number().integer().min(0),
        unity: Joi.number().integer().min(0),
        enabled: Joi.number().integer().allow(0, 1, null),
      }),
    };

    return this.validate(schema);
  }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        ingredientId: Joi.number().integer().required(),
      }),
    };

    return this.validate(schema);
  }
}

module.exports = IngredientSchema;
