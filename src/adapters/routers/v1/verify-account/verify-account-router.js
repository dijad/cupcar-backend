const { Router } = require('express');

const { verifyAccount } = require('../../../../usecases/user-usecase')

function verifyAccountRouterV1(usersRepository) {

  const router = Router();

  router.get('/v1/verify-account', async (req, res) => {
    try {
      const secretToken = req.query.secretToken;
      const responseVerifyAccount = await verifyAccount(usersRepository, secretToken);

      res.status(200).send({
        status: responseVerifyAccount.status,
        data: responseVerifyAccount.data
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

module.exports = verifyAccountRouterV1;
