const bcrypt = require('bcrypt-nodejs');

const UserModel = require('../models/UserModel');
const ERROR_TYPE = require('../types/errors');

class UserService {
  static list() {
    return UserModel.list()
      .then((dbList) => {
        if (dbList.length === 0) {
          return dbList;
        }

        const result = dbList.map(user => ({
          id: user.id,
          username: user.username,
          name: user.name,
        }));
        return result;
      });
  }

  static get(data) {
    return UserModel.get(data)
      .then(([user]) => {
        if (user === undefined) {
          return null;
        }

        const result = {
          id: user.id,
          username: user.username,
          name: user.name,
        };
        return result;
      });
  }

  static getByUsername(data) {
    return UserModel.getByUsername(data)
      .then(([user]) => {
        if (user === undefined) {
          return null;
        }

        const result = {
          id: user.id,
          username: user.username,
          password: user.password,
          name: user.name,
        };
        return result;
      });
  }

  static post(data) {
    return UserModel.post(data);
  }

  static put(data) {
    return UserModel.put(data);
  }

  static delete(data) {
    return UserModel.delete(data);
  }

  static comparePassword(password, userPassword) {
    return new Promise((resolve, reject) => {
      if (!userPassword) return reject(new Error(ERROR_TYPE.PASSWORD.NOT_PROVIDED));
      return !bcrypt.compareSync(password, userPassword) ?
        reject(new Error(ERROR_TYPE.PASSWORD.INVALID)) :
        resolve(true);
    });
  }
}

module.exports = UserService;
