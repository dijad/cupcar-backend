const jwt = require("jsonwebtoken");

function signJWT(dataInToken, expireTime) {
  const token = jwt.sign(
    dataInToken,
    process.env.SECRET_KEY_JWT,
    {
      expiresIn: expireTime
    });
  return token;
}

module.exports = { signJWT }
