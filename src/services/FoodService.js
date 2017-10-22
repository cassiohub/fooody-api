const latinize = require('latinize');

const FoodLibrary = require('../types/foods');

class FoodService {
  static list(food) {
    return Promise.resolve(FoodLibrary.filter((fl) => {
      const flSanitized = latinize(fl.toLocaleLowerCase());
      const foodSanitized = latinize(food.toLocaleLowerCase());

      return flSanitized.indexOf(foodSanitized) !== -1;
    }));
  }
}

module.exports = FoodService;
