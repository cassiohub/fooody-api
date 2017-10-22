const jwt = require('jsonwebtoken');

const cookToken = (user) => {
  const payload = { sub: user.id };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return err;
  }
};

module.exports = {
  cookToken,
  decodeToken,
};
