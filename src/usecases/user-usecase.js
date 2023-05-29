const appRoot = require('app-root-path');

const ValidatorPass = require(appRoot + '/src/utils/validatorPass');
const { matchString } = require(appRoot + '/src/utils/utils');
const { getTypeFailValidationPass, generateRandomString, validateNullsInArrayOfData } = require(appRoot + '/src/utils/utils');
const { encryptString } = require(appRoot + '/src/utils/utils')
const { EXPIRE_OPTIONS } = require(appRoot + '/src/utils/constants')
const { isEmail, isPhoneNumber } = require(appRoot + '/src/utils/validator');
const { signJWT } = require(appRoot + '/src/utils/jwt');
const { sendValidationSignUp } = require(appRoot + '/src/usecases/mailing-usecase');



async function signUp(usersRepository, name = null, lastname = null, email, password, gender = null, phone, role) {

  const payloadSignUp = [name, lastname, gender];
  if (validateNullsInArrayOfData(payloadSignUp)) {
    return {
      status: false,
      data: 'Campos de registro incompletos.'
    }
  }

  if (!isEmail(email)) {
    return {
      status: false,
      data: 'Formato de correo electrónico no valido.'
    }
  }

  const user = await usersRepository.getUserByEmail(email);
  if (user) return {
    status: false,
    data: 'Esta dirección de correo electrónico ya se encuentra en uso.'
  }

  if (!isPhoneNumber(phone)) {
    return {
      status: false,
      data: 'Formato de número de teléfono movil no valido.'
    }
  }

  const passwordValidation = ValidatorPass.validate(password, { list: true });
  if (passwordValidation.length > 0) {
    return {
      status: false,
      data: getTypeFailValidationPass(passwordValidation[0])
    }
  }

  const token = await encryptString(generateRandomString());
  const newUser = {
    name, lastname, phone, role, gender: gender.toUpperCase(),
    email, password: await encryptString(password), token
  };
  const responseSignUp = await usersRepository.signUp(newUser);
  sendValidationSignUp(newUser.email, token);

  return {
    status: responseSignUp,
    data: responseSignUp ? 'Registro realizado satisfactoriamente.' : 'No se pudo realizar el registro con exito.'
  }
}

async function login(usersRepository, email, password) {

  if (!isEmail(email)) {
    return {
      status: false,
      data: 'Formato de correo electrónico no valido.'
    }
  }

  const user = await usersRepository.getUserByEmail(email);
  if (!user) return {
    status: false,
    data: 'Esta dirección de correo electrónico no está asociada a una cuenta.'
  };

  if (!user.active) return {
    status: false,
    data: 'Cuenta actualmente desactivada'
  }

  const isMatched = await matchString(password, user.password);
  const token = signJWT(
    {
      id: user.id,
      role: user.role
    },
    EXPIRE_OPTIONS.oneHour
  );
  return {
    status: isMatched,
    data: isMatched ? token : 'Correo o contraseña incorrecta.'
  };
}

async function verifyAccount(usersRepository, secretToken) {
  const user = await usersRepository.getUserBySecretToken(secretToken);
  if (user) {
    await usersRepository.verifyAccount(user.id);
    return {
      status: true,
      data: 'Cuenta verificada.'
    }
  } else {
    return { status: false, data: 'Error verificando cuenta'}
  }
}
module.exports = {
  signUp,
  login,
  verifyAccount
};
