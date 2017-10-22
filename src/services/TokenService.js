const TokenModel = require('../models/TokenModel');

class TokenService {
  static get(data) {
    return TokenModel.get(data)
      .then((token) => {
        if (token === undefined) {
          return null;
        }

        const result = {
          id: token.id,
          token: token.token,
          userId: token.userId,
          enabled: token.enabled,
        };
        return result;
      });
  }

  static post(data) {
    return TokenModel.post(data);
  }

  static put(data) {
    return TokenModel.put(data);
  }
}

module.exports = TokenService;
