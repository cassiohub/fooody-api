const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class LoginSchema extends RouteValidator {
  static get post() {
    const schema = {
      body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }
}

module.exports = LoginSchema;
