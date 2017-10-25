const Logger = require('../helpers/Logger');
const UserService = require('../services/UserService');

class UserController {
  static list(req, res) {
    UserService.list()
      .then((rows) => {
        res.send({ rows });
      })
      .catch((err) => {
        Logger.throw(res, '3272358416', err);
      });
  }

  static get(req, res) {
    const { userId } = req;
    UserService.get({ userId })
      .then((user) => {
        if (!user) {
          res.send({ success: false, code: '7731668134', message: req.__('api.user.notFound') });
          return;
        }
        res.send({ user });
      })
      .catch((err) => {
        Logger.throw(res, '6001059324', err);
      });
  }

  static getByUsername(req, res) {
    UserService.getByUsername(req.params, true)
      .then((user) => {
        if (!user) {
          res.send({ success: false, code: '834923422', message: req.__('api.user.notFound') });
          return;
        }
        res.send({ user });
      })
      .catch((err) => {
        Logger.throw(res, '6001059324', err);
      });
  }

  static getFavorites(req, res) {
    UserService.getFavorites({ userId: req.userId })
      .then((favorites) => {
        res.send({ favorites });
      })
      .catch((err) => {
        Logger.throw(res, '84092832', err);
      });
  }

  static post(req, res) {
    UserService.post(req.body)
      .then((ids) => {
        res.send({ success: true, id: ids[0] });
      })
      .catch((err) => {
        Logger.throw(res, '2365958507', err);
      });
  }

  static put(req, res) {
    const data = {
      userId: req.params.userId,
      username: req.params.username,
      name: req.body.name,
    };
    console.log(req.userId);
    if (req.params.userId === req.userId) {
      return UserService.put(data)
        .then((user) => {
          if (!user) {
            return res.send({ success: false, code: '7502749763', message: req.__('api.user.notFound') });
          }
          return res.send({ success: true });
        })
        .catch((err) => {
          Logger.throw(res, '5768905470', err);
        });
    }
    return res.status(401).send({ success: false, code: '34829342', message: req.__('api.user.notAuthorized') });
  }

  static delete(req, res) {
    UserService.delete(req.params)
      .then((user) => {
        if (!user) {
          res.send({ success: false, code: '9517673561', message: req.__('api.user.notFound') });
          return;
        }
        res.send({ success: true });
      })
      .catch((err) => {
        Logger.throw(res, '5768905476', err);
      });
  }
}

module.exports = UserController;
