const { knex } = require('../config/db');
const userType = require('../types/user');

const USER = 'user';

class UserModel {
  static list() {
    return knex
      .from(USER);
  }

  static get(data) {
    return knex
      .from(USER)
      .where(`${USER}.id`, data.userId);
  }

  static getByUsername(data) {
    return knex
      .from(USER)
      .where(`${USER}.username`, data.username);
  }

  static post(data) {
    return knex
      .from(USER)
      .insert(data);
  }

  static put(data) {
    const query = knex
      .from(USER);

    if (data.name) {
      query.update('name', data.name);
    }

    query.where(`${USER}.id`, data.userId);

    return query;
  }

  static delete(data) {
    return knex
      .from(USER)
      .where(`${USER}.id`, data.userId)
      .where(`${USER}.enabled`, userType.ENABLED)
      .update({
        enabled: userType.DISABLED,
      });
  }
}

module.exports = UserModel;
