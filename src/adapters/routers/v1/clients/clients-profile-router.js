const { Router } = require('express');

const { verifyToken, verifyIsClient } = require('../../../../middlewares/auth');
const { completeUserProfile } = require('../../../../usecases/user-usecase');
const { getProfile } = require('../../../../usecases/clients-usecase');

const fileUpload = require('express-fileupload');

function clientsProfileRouterV1(usersRepository, clientsRepository) {

  const router = Router();

  router.put('/v1/clients/profile', [ verifyToken, verifyIsClient,
    fileUpload({
      useTempFiles : true,
      tempFileDir : './uploads'
    })
  ], async (req, res) => {

    try {

      const userId = req.user;
      const photoPath = req.files.photo.tempFilePath || null;

      const reponse = await completeUserProfile(usersRepository, photoPath, userId);

      res.status(200).send({
        status: reponse.status,
        data: reponse.data
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

  router.get('/v1/clients/profile', [ verifyToken, verifyIsClient ], async (req, res) => {

    try {

      const userId = req.user;
      const reponse = await getProfile(clientsRepository, userId);

      res.status(200).send({
        status: reponse.status,
        data: reponse.data
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

module.exports = clientsProfileRouterV1;
