const { knex } = require('../config/db');

const FAVORITE = 'favorite';

class FavoriteModel {
  static list(data) {
    return knex
      .from(FAVORITE)
      .where(`${FAVORITE}.userId`, data.userId)
      .andWhere(`${FAVORITE}.enabled`, 1);
  }

  static get(data) {
    return knex
      .from(FAVORITE)
      .where(`${FAVORITE}.id`, data.favoriteId)
      .andWhere(`${FAVORITE}.enabled`, 1);
  }

  static post(data) {
    return knex
      .from(FAVORITE)
      .insert(data);
  }

  static put(data) {
    const query = knex
      .from(FAVORITE);
    if (data.link) query.update('link', data.link);
    if (data.name) query.update('name', data.name);
    if (data.enabled !== undefined) query.update('enabled', data.enabled);
    query
      .where(`${FAVORITE}.id`, data.favoriteId);

    return query;
  }

  static delete(data) {
    return knex
      .from(FAVORITE)
      .where(`${FAVORITE}.favoriteId`, data.favoriteId)
      .andWhere(`${FAVORITE}.userId`, data.userId)
      .update({
        enabled: 0,
      });
  }
}

module.exports = FavoriteModel;
