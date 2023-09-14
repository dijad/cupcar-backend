const { Router } = require('express');

const { getDepartments, getCitiesByDepartmentDaneCode, getCitiesFromText } = require('../../../../usecases/places-usecase');

function placeRouterV1(placeRepository) {

  const router = Router();

  router.get('/v1/departments' ,async (req, res) => {
    try {

      const responsePlaces = await getDepartments(placeRepository);

      res.status(200).send({
        status: responsePlaces.status,
        data: responsePlaces.data
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

  router.get('/v1/departments/:department_dane_code/cities' ,async (req, res) => {
    try {

      const searchText = req.query.search;
      const departmentDaneCode = Number(req.params.department_dane_code);
      const responsePlaces = await getCitiesByDepartmentDaneCode(placeRepository, departmentDaneCode, searchText);

      res.status(200).send({
        status: responsePlaces.status,
        data: responsePlaces.data
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

  router.get('/v1/cities' ,async (req, res) => {
    try {

      const searchText = req.query.search;
      const responsePlaces = await getCitiesFromText(placeRepository, searchText);

      res.status(200).send({
        status: responsePlaces.status,
        data: responsePlaces.data
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

module.exports = placeRouterV1;
