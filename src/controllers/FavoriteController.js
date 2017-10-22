const Logger = require('../helpers/Logger');
const FavoriteService = require('../services/FavoriteService');

class FavoriteController {
  static list(req, res) {
    const { userId } = req;
    FavoriteService.list({ userId })
      .then((rows) => {
        res.status(200).send(rows);
      })
      .catch((err) => {
        Logger.throw(res, '89085509453', err);
      });
  }

  static get(req, res) {
    FavoriteService.get(req.params)
      .then((favorite) => {
        if (!favorite) {
          res.status(404).send({ code: '89387539485', message: req.__('api.favorite.notFound') });
          return;
        }
        res.send(favorite);
      })
      .catch((err) => {
        Logger.throw(res, '89387589345', err);
      });
  }

  static post(req, res) {
    const { userId } = req;
    const favorite = Object.assign(req.body, { userId });

    FavoriteService.post(favorite)
      .then((ids) => {
        const id = ids[0];
        res.set('Location', `/favorite/${id}`);
        res.status(201).send({ success: true, id });
      })
      .catch((err) => {
        return Logger.throw(res, '893872342342', err);
      });
  }

  static put(req, res) {
    const data = {
      favoriteId: req.params.favoriteId,
      userId: req.userId,
      link: req.body.link,
      name: req.body.name,
      enabled: req.body.enabled,
    };

    FavoriteService.put(data)
      .then((favorite) => {
        if (!favorite) {
          res.status(404).send({ code: '8974334875', message: req.__('api.favorite.notFound') });
          return;
        }
        res.status(204).send({ success: true });
      })
      .catch((err) => {
        Logger.throw(res, '893748534', err);
      });
  }

  static delete(req, res) {
    const favorite = {
      favoriteId: req.params.favoriteId,
      userId: req.userId,
    };

    FavoriteService.delete(favorite)
      .then((favorite) => {
        if (!favorite) {
          res.status(404).send({ code: '89475394593', message: req.__('api.favorite.notFound') });
          return;
        }
        res.status(204).send({ success: true });
      })
      .catch((err) => {
        Logger.throw(res, '8973539459', err);
      });
  }
}

module.exports = FavoriteController;
