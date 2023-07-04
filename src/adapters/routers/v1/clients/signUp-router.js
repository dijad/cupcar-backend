const { Router } = require('express');
const appRoot = require('app-root-path');

const { ROLES } = require(appRoot + '/src/utils/constants');

const { signUp } = require(appRoot + '/src/usecases/user-usecase')

function signUpRouterV1(usersRepository) {

  const router = Router();

  router.post('/v1/clients/sign-up', async (req, res) => {
    try {
      const { name, lastname, email, password, gender, phone } = req.body;

      const reponseSignUp = await signUp(usersRepository, name, lastname, email, password, gender, phone, ROLES.client);

      res.status(200).send({
        status: reponseSignUp.status,
        data: reponseSignUp.data
      });
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

module.exports = signUpRouterV1;
