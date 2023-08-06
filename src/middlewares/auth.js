const appRoot = require('app-root-path');
const jwt = require('jsonwebtoken');
const { createResponse } = require(appRoot + '/src/utils/utils');

const { ROLES } = require(appRoot + '/src/utils/constants')

function verifyToken(req, res, next) {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).send(createResponse(false, 'Acceso no autorizado, se debe proporcionar un token valido'));
  }

  try {
    const decodeJWT = jwt.verify(token, process.env.SECRET_KEY_JWT);
    req.user = decodeJWT.id;
    req.role = decodeJWT.role;
    next();
  } catch (error) {
    return res.status(401).json(createResponse(false, 'Token de acceso inválido'));
  }
}

function verifyIsClient(req, res, next) {
  const ROLES_VERIFY = [ROLES.admin, ROLES.client];
  try {
    const role = req.role;
    if (ROLES_VERIFY.includes(role)) {
      next();
      return;
    } else {
      return res.status(401).send(createResponse(false, 'Acceso inválido'));
    }
  } catch (error) {
    return res.status(401).send(createResponse(false, 'Error de autenticación'));
  }
}

function verifyIsAdmin(req, res, next) {
  try {
    const role = req.role;
    if (role === ROLES.admin) {
      next();
      return;
    } else {
      return res.status(401).send(createResponse(false, 'Acceso inválido'));
    }
  } catch (error) {
    return res.status(401).send(createResponse(false, 'Error de autenticación'));
  }
}

module.exports = {
  verifyToken,
  verifyIsClient,
  verifyIsAdmin
}
