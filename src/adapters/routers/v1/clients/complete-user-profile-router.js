const { Router } = require('express');
const appRoot = require('app-root-path');

const { verifyToken, verifyIsClient } = require(appRoot + '/src/middlewares/auth');
const { completeUserProfile } = require(appRoot + '/src/usecases/user-usecase');

const fileUpload = require('express-fileupload');

function completeUserProfileRouterV1(usersRepository) {

  const router = Router();

  router.put('/v1/clients/profile', [ //poner foto de perfil
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

  return router;
}

module.exports = completeUserProfileRouterV1;
