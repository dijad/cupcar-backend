const { Router } = require('express');
const appRoot = require('app-root-path');

const { verifyAccount } = require(appRoot + '/src/usecases/user-usecase')

function verifyAccountRouterV1(usersRepository) {

  const router = Router();

  router.get('/v1/verify-account', async (req, res) => {
    try {
      const secretToken = req.query.secretToken;
      const responseVerifyAccount = await verifyAccount(usersRepository, secretToken);
      console.log("🚀 ~ file: verify-account-router.js:14 ~ router.get ~ responseVerifyAccount:", responseVerifyAccount)

      res.status(200).send({
        status: responseVerifyAccount.status,
        data: responseVerifyAccount.data
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

module.exports = verifyAccountRouterV1;
