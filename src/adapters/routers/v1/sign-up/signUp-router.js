const { Router } = require('express');
const appRoot = require('app-root-path');

const { signUp } = require(appRoot + '/src/usecases/user-usecase')

function signUpRouterV1(firestoreUser) {

  const router = Router();

  router.get('/v1/sign-up', async (req, res) => {
    try {
      const { name, lastname, email, password, gender, phone } = req.body;

      const reponseSignUp = await signUp(firestoreUser, name, lastname, email, password, gender, phone);

      res.status(200).send({
        status: reponseSignUp.status,
        data: reponseSignUp.data
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

module.exports = signUpRouterV1;