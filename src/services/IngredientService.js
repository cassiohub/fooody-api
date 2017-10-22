const IngredientModel = require('../models/IngredientModel');

class IngredientService {
  static list(data) {
    return IngredientModel.list(data)
      .then((dbList) => {
        if (dbList.length === 0) {
          return dbList;
        }

        const result = dbList.map(ingredient => ({
          id: ingredient.id,
          name: ingredient.name,
          quantity: ingredient.quantity,
          unity: ingredient.unity,
          enabled: ingredient.enabled,
        }));
        return result;
      });
  }

  static get(data) {
    return IngredientModel.get(data)
      .then(([ingredient]) => {
        if (ingredient === undefined) {
          return null;
        }

        const result = {
          id: ingredient.id,
          name: ingredient.name,
          quantity: ingredient.quantity,
          unity: ingredient.unity,
          enabled: ingredient.enabled,
        };
        return result;
      });
  }

  static post(data) {
    return IngredientModel.post(data);
  }

  static put(data) {
    return IngredientModel.put(data);
  }

  static delete(data) {
    return IngredientModel.delete(data);
  }
}

module.exports = IngredientService;
