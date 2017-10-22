const { knex } = require('../config/db');

const INGREDIENT = 'ingredient';
const USER_INGREDIENT = 'useringredientxref';

class IngredientModel {
  static list(data) {
    return knex
      .from(USER_INGREDIENT)
      .innerJoin(INGREDIENT, `${USER_INGREDIENT}.ingredientId`, `${INGREDIENT}.id`)
      .where(`${USER_INGREDIENT}.userId`, data.userId);
  }

  static get(data) {
    console.log(data);
    return knex
      .from(INGREDIENT)
      .innerJoin(USER_INGREDIENT, `${USER_INGREDIENT}.ingredientId`, `${INGREDIENT}.id`)
      .where(`${INGREDIENT}.id`, data.ingredientId)
      .andWhere(`${USER_INGREDIENT}.userId`, data.userId);
  }

  static post(data) {
    return new Promise((resolve, reject) => {
      return knex
        .from(INGREDIENT)
        .insert({
          name: data.name,
          quantity: data.quantity,
          unity: data.unity,
        })
        .returning('id')
        .then((ingredientId) => {
          return knex
            .from(USER_INGREDIENT)
            .insert({
              ingredientId,
              userId: data.userId,
            })
            .then(() => resolve(true))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  static put(data) {
    const query = knex
      .from(INGREDIENT);

    if (data.name) query.update('name', data.name);
    if (data.quantity) query.update('quantity', data.quantity);
    if (data.unity) query.update('unity', data.unity);
    if (data.enabled !== undefined) query.update('enabled', data.enabled);
    query
      .where(`${INGREDIENT}.id`, data.ingredientId);

    return query;
  }

  static delete(data) {
    return knex
      .from(USER_INGREDIENT)
      .where(`${USER_INGREDIENT}.ingredientId`, data.ingredientId)
      .andWhere(`${USER_INGREDIENT}.userId`, data.userId)
      .update({
        enabled: 0,
      });
  }

  static status(data) {
    const enabled = data.status === 'enabled' ? 1 : 0;
    return knex
      .from(USER_INGREDIENT)
      .where(`${USER_INGREDIENT}.ingredientId`, data.ingredientId)
      .andWhere(`${USER_INGREDIENT}.userId`, data.userId)
      .update({
        enabled,
      });
  }
}

module.exports = IngredientModel;
