const { knex } = require('../config/db');

const TOKEN = 'token';

class TokenModel {
  static get(data) {
    return knex
      .from(TOKEN)
      .first()
      .where(`${TOKEN}.token`, data.token)
      .where(`${TOKEN}.enabled`, 1);
  }

  static post(data) {
    return knex
      .from(TOKEN)
      .insert(data);
  }

  static put(data) {
    const query = knex.from(TOKEN);

    if (data.token) {
      query.update('enabled', data.enabled);
    }

    query.where(`${TOKEN}.token`, data.token);

    return query;
  }
}

module.exports = TokenModel;
