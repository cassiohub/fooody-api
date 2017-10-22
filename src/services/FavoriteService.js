const FavoriteModel = require('../models/FavoriteModel');

class FavoriteService {
  static list(data) {
    return FavoriteModel.list(data)
      .then((dbList) => {
        if (dbList.length === 0) {
          return dbList;
        }

        const result = dbList.map(favorite => ({
          id: favorite.id,
          link: favorite.link,
          name: favorite.name,
        }));
        return result;
      });
  }

  static get(data) {
    return FavoriteModel.get(data)
      .then(([favorite]) => {
        if (favorite === undefined) {
          return null;
        }

        const result = {
          id: favorite.id,
          link: favorite.link,
          name: favorite.name,
        };
        return result;
      });
  }

  static post(data) {
    return FavoriteModel.post(data);
  }

  static put(data) {
    return FavoriteModel.put(data);
  }

  static delete(data) {
    return FavoriteModel.delete(data);
  }
}

module.exports = FavoriteService;
