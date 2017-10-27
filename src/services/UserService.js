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
          email: user.email,
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
          email: user.email,
        };
        return result;
      });
  }

  static getFavorites(data) {
    return UserModel.getFavorites(data)
      .then((favorites) => {
        return favorites.length ? favorites.map((fav) => {
          return {
            name: fav.name,
            link: fav.link,
            enabled: fav.enabled,
          };
        }) : [];
      });
  }

  static getByUsername(data, hidePassword) {
    return UserModel.getByUsername(data)
      .then(([user]) => {
        if (user === undefined) {
          return null;
        }

        const result = {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
        };
        return hidePassword ? result : Object.assign(result, { password: user.password });
      });
  }

  static getByEmail(data, hidePassword) {
    return UserModel.getByEmail(data)
      .then(([user]) => {
        if (user === undefined) {
          return null;
        }

        const result = {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
        };
        return hidePassword ? result : Object.assign(result, { password: user.password });
      });
  }

  static post(data) {
    const {
      username,
      name,
      password,
      email,
    } = data;
    const user = {
      username,
      name,
      email,
      password: bcrypt.hashSync(password),
    };

    return UserModel.post(user);
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
