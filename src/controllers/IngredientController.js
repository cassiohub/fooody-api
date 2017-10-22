const Logger = require('../helpers/Logger');
const IngredientService = require('../services/IngredientService');

class IngredientController {
  static list(req, res) {
    const { userId } = req;
    IngredientService.list({ userId })
      .then((rows) => {
        res.status(200).send(rows);
      })
      .catch((err) => {
        Logger.throw(res, '89085509453', err);
      });
  }

  static get(req, res) {
    IngredientService.get(req.params)
      .then((ingredient) => {
        if (!ingredient) {
          res.status(404).send({ code: '89387539485', message: req.__('api.ingredient.notFound') });
          return;
        }
        res.send(ingredient);
      })
      .catch((err) => {
        Logger.throw(res, '89387589345', err);
      });
  }

  static post(req, res) {
    const { userId } = req;
    const ingredient = Object.assign(req.body, { userId });

    IngredientService.post(ingredient)
      .then((ids) => {
        const id = ids[0];
        res.set('Location', `/ingredient/${id}`);
        res.status(201).send({ success: true, id });
      })
      .catch((err) => {
        console.log(err);
        return Logger.throw(res, '893872342342', err);
      });
  }

  static put(req, res) {
    const data = {
      ingredientId: req.params.ingredientId,
      userId: req.userId,
      name: req.body.name,
      quantity: req.body.quantity,
      unity: req.body.unity,
      enabled: req.body.enabled,
    };

    IngredientService.put(data)
      .then((ingredient) => {
        if (!ingredient) {
          res.status(404).send({ code: '8974334875', message: req.__('api.ingredient.notFound') });
          return;
        }
        res.status(204).send({ success: true });
      })
      .catch((err) => {
        Logger.throw(res, '893748534', err);
      });
  }

  static delete(req, res) {
    const ingredient = {
      ingredientId: req.params.ingredientId,
      userId: req.userId,
    };

    IngredientService.delete(ingredient)
      .then((ingredient) => {
        if (!ingredient) {
          res.status(404).send({ code: '89475394593', message: req.__('api.ingredient.notFound') });
          return;
        }
        res.status(204).send({ success: true });
      })
      .catch((err) => {
        Logger.throw(res, '8973539459', err);
      });
  }
}

module.exports = IngredientController;
