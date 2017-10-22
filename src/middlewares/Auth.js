const UserService = require('../services/UserService');
const TokenService = require('../services/TokenService');

class Auth {
  static hasCredentials(req, res, next) {
    if (!(req.headers && req.headers.authorization)) {
      return res.status(401).send({ success: false, message: 'Token not provided!' });
    }
    const token = req.headers.authorization.split(' ')[1];
    return (token) ? TokenService.get({ token })
      .then((tokenInfo) => {
        if (!tokenInfo) return res.status(401).send({ success: false, message: 'Invalid Token' });

        req.userId = tokenInfo.userId;
        return next();
      })
      .catch((err) => {
        res.status(401).send({ success: false, message: err });
      }) : res.status(401).send({ success: false, message: 'Token not provided!' });
  }

  static identifyUser(req, res, next) {
    const { userId } = req;

    return UserService.get({ userId })
      .then((user) => {
        req.user = user;
        return next();
      })
      .catch(() => res.status(401).send({ success: false, message: 'Not Authorized' }));
  }
}

module.exports = Auth;
