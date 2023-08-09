const { Router } = require('express');

const { login } = require('../../../../usecases/user-usecase')

function loginRouterV1(usersRepository) {

  const router = Router();

  router.post('/v1/clients/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const responseLogin = await login(usersRepository, email, password);
      console.log("🚀 ~ file: login-router.js:15 ~ router.post ~ responseLogin:", responseLogin)

      if (responseLogin.status) {
        res.status(200).json({
          status: responseLogin.status,
          data: responseLogin.data
        });
      } else {
        res.status(200).send({
          status: responseLogin.status,
          data: responseLogin.data
        });
      }
    } catch (err) {
      const errBody = {
        status: false,
        data: {
         message: err.message,
         url: req.originalUrl
        }
      }
      console.error("Backend response ->", JSON.stringify(errBody, null, 3))
      res.status(err.statusCode || 500).send(errBody)
    }
  });

  return router;
}

module.exports = loginRouterV1;
