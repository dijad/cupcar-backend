const jwt = require("jsonwebtoken");
const { EXPIRE_OPTIONS } = require('./constants');

const generateAccessToken = (payload) => {
  const secret = process.env.SECRET_KEY_JWT;
  const expiresIn = EXPIRE_OPTIONS.sevenDays;

  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = { generateAccessToken }
