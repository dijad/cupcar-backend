const { Router } = require('express');
const appRoot = require('app-root-path');

const { login } = require(appRoot + '/src/usecases/user-usecase')

function loginRouterV1(firestoreUser) {

  const router = Router();

  router.get('/v1/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const reponseLogin = await login(firestoreUser, email, password);

      res.status(200).send({
        status: reponseLogin.status,
        data: reponseLogin.data
      });
    } catch (err) {
      const errBody = {
          code: 'failed',
          message: err.message,
          url: req.originalUrl
        }
        console.error("Backend response ->", JSON.stringify(errBody, null, 3))
        res.status(err.statusCode || 500).send(errBody)
    }
  });

  return router;
}

module.exports = loginRouterV1;
