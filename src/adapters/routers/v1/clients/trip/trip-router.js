const { Router } = require('express');
const appRoot = require('app-root-path');

const { createTrip, getTripsByAttributes } = require(appRoot + '/src/usecases/trip-usecase');
const { verifyToken, verifyIsClient } = require(appRoot + '/src/middlewares/auth')

function tripRouterV1(tripRepository) {

  const router = Router();

  router.post('/v1/clients/trip', [verifyToken, verifyIsClient] ,async (req, res) => {
    try {
      const { origin, destination, seats, description, tripDate } = req.body;
      const responseCreateTrip= await createTrip(tripRepository, origin, destination, seats, description, tripDate, req.user);

      res.status(200).send({
        status: responseCreateTrip.status,
        data: responseCreateTrip.data
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

  router.get('/v1/clients/trip', [verifyToken, verifyIsClient] ,async (req, res) => {
    try {
      const { origin, destination, seats } = req.query;
      const responseGetTrips= await getTripsByAttributes(tripRepository, origin, destination, seats);

      res.status(200).send({
        status: responseGetTrips.status,
        data: responseGetTrips.data
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

module.exports = tripRouterV1;
