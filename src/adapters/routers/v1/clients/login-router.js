const { Router } = require('express');
const appRoot = require('app-root-path');

const { login } = require(appRoot + '/src/usecases/user-usecase')

function loginRouterV1(usersRepository) {

  const router = Router();

  router.post('/v1/clients/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const responseLogin = await login(usersRepository, email, password);

      if (responseLogin.status) {
        res.set('refresh-token', responseLogin.data.refreshToken);
        res.set('Access-Control-Expose-Headers', 'refresh-token')
        res.status(200).json({
          status: responseLogin.status,
          data: responseLogin.data.accessToken
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
