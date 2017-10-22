const Logger = require('../helpers/Logger');
const Auth = require('../helpers/Auth');

const ERROR_TYPE = require('../types/errors');

const UserService = require('../services/UserService');
const TokenService = require('../services/TokenService');

class LoginController {
  static authenticate(req, res) {
    const { username, password } = req.body;
    let userObject;

    return UserService.getByUsername({ username })
      .then((user) => {
        if (!user) throw new Error(ERROR_TYPE.USER.NOT_FOUND);
        userObject = user;
        return UserService.comparePassword(password, user.password);
      })
      .then(() => {
        const token = Auth.cookToken(userObject);
        userObject = Object.assign(userObject, { token });

        return TokenService.post({ userId: userObject.id, token });
      })
      .then(() => {
        const { token, name } = userObject;

        return res.send({
          token,
          username,
          name,
        });
      })
      .catch((err) => {
        switch (err.message) {
          case ERROR_TYPE.USER.NOT_FOUND:
            return res.status(403).send({ code: '327235843', message: req.__('api.user.notFound') });
          case ERROR_TYPE.PASSWORD.INVALID:
            return res.status(403).send({ code: '327235844', message: req.__('api.user.invalidPassword') });
          default:
            console.log(JSON.stringify(err));
            return Logger.throw(res, '3272358416', err);
        }
      });
  }
}

module.exports = LoginController;
