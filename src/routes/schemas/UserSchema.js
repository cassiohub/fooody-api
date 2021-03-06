const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class UserSchema extends RouteValidator {
  static get get() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.number().integer().required(),
      }),
    };

    return this.validate(schema);
  }

  static get getByUsername() {
    const schema = {
      params: Joi.object().keys({
        username: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }

  static get getByEmail() {
    const schema = {
      params: Joi.object().keys({
        userEmail: Joi.string().email().required(),
      }),
    };

    return this.validate(schema);
  }

  static get list() {
    const schema = {};

    return this.validate(schema);
  }

  static get post() {
    const schema = {
      body: Joi.object().keys({
        username: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
      }),
    };

    return this.validate(schema);
  }

  static get put() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.number().integer().required(),
      }),
      body: Joi.object().keys({
        name: Joi.string().min(3),
        username: Joi.string().min(3),
        email: Joi.string().email(),
      }),
    };

    return this.validate(schema);
  }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.number().integer().required(),
      }),
    };

    return this.validate(schema);
  }
}

module.exports = UserSchema;
