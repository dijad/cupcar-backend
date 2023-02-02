const appRoot = require('app-root-path');
const { matchPassword } = require('../utils/utils');

const { encryptPassword } = require(appRoot + '/src/utils/utils')

const UserEntity = require('./users/user-entity');

const ValidatorPass = require(appRoot + '/src/utils/validatorPass');
const { getTypeFailValidationPass } = require(appRoot + '/src/utils/utils');
const { isEmail, isPhoneNumber } = require(appRoot + '/src/utils/validator');

async function signUp(firestoreUsers, name, lastname, email, password, gender, phone) {

  if (!isEmail(email)) {
    return {
      status: false,
      data: 'Formato de correo electrónico no valido.'
    }
  }

  const user = await firestoreUsers.existUser(email);
  if (user) return {
    status: false,
    data: 'Esta dirección de correo electrónico ya se encuentra en uso.'
  }

  if (!isPhoneNumber(phone)) {
    return {
      status: false,
      data: 'Formato de número de teléfono movil no valido.'}
  }

  const passwordValidation = ValidatorPass.validate(password, { list: true });
  if (passwordValidation.length > 0) {
    return {
      status: false,
      data: getTypeFailValidationPass(passwordValidation[0]) }
  }

  const userEntity = new UserEntity(name, lastname, email, await encryptPassword(password), gender.toUpperCase(), phone);
  const responseFirestoreSignUp = await firestoreUsers.signUp(userEntity.serialize());

  return {
    status: responseFirestoreSignUp,
    data: responseFirestoreSignUp ? 'Registro realizado satisfactoriamente.' : 'No se pudo realizar el registro con exito.'
  }
}

async function login(firestoreUsers, email, password) {

  if (!isEmail(email)) {
    return {
      status: false,
      data: 'Formato de correo electrónico no valido.'
    }
  }

  const user = await firestoreUsers.existUser(email);
  if (!user) return {
    status: false,
    data: 'Esta dirección de correo electrónico no está asociada a una cuenta.'
  };

  if (!user.active) return {
    status: false,
    data: 'Cuenta actualmente desactivada'
  }

  const isMatched = await matchPassword(password, user.password);
  return {
    status: isMatched,
    data: isMatched ? 'Inicio de sesión correcto.' : 'Contraseña incorrecta.'
  };
}

module.exports = { signUp, login };
