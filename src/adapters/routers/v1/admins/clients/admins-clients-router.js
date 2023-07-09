const { Router } = require('express');
const appRoot = require('app-root-path');

const { getClients } = require(appRoot + '/src/usecases/clients-usecase');
const { verifyToken, verifyIsAdmin } = require(appRoot + '/src/middlewares/auth');

function adminsClientsRouterV1(clientsRepository) {

  const router = Router();

  router.get('/v1/admins/clients', [verifyToken, verifyIsAdmin], async (req, res) => {
    try {

      const clients = await getClients(clientsRepository);

      res.status(200).send({
        status: clients.status,
        data: clients.data
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

module.exports = adminsClientsRouterV1;
