const appRoot = require('app-root-path');

const ValidatorPass = require(appRoot + '/src/utils/validatorPass');
const { matchString } = require(appRoot + '/src/utils/utils');
const { getTypeFailValidationPass, generateRandomString, validateNullsInArrayOfData } = require(appRoot + '/src/utils/utils');
const { encryptString, createResponse } = require(appRoot + '/src/utils/utils');
const { isEmail, isPhoneNumber } = require(appRoot + '/src/utils/validator');
const { generateAccessToken } = require(appRoot + '/src/utils/jwt');
const { sendValidationSignUp } = require(appRoot + '/src/usecases/mailing-usecase');
const { uploadImage } = require(appRoot + '/src/frameworks/images-store/cloudinary');

const fs = require('fs-extra');

async function signUp(usersRepository, name = null, lastname = null, email, password, gender = null, phone, role) {

  const payloadSignUp = [name, lastname, gender];

  if (validateNullsInArrayOfData(payloadSignUp)) {
    return createResponse(false, 'Campos de registro incompletos.');
  }

  if (!isEmail(email)) {
    return createResponse(false, 'Formato de correo electrónico no válido.');
  }

  const user = await usersRepository.getUserByEmail(email);
  if (user) {
    return createResponse(false, 'Esta dirección de correo electrónico ya se encuentra en uso.');
  }

  if (!isPhoneNumber(phone)) {
    return createResponse(false, 'Formato de número de teléfono móvil no válido.');
  }

  const passwordValidation = ValidatorPass.validate(password, { list: true });
  if (passwordValidation.length > 0) {
    return createResponse(false, getTypeFailValidationPass(passwordValidation[0]));
  }

  const token = await encryptString(generateRandomString());
  const newUser = {
    name,
    lastname,
    phone,
    role,
    gender: gender.toUpperCase(),
    email,
    password: await encryptString(password),
    token,
  };

  const responseSignUp = await usersRepository.signUp(newUser);
  sendValidationSignUp(newUser.email, token);

  const message = responseSignUp ? 'Registro realizado satisfactoriamente.' : 'No se pudo realizar el registro con éxito.';
  return createResponse(responseSignUp, message);
}

async function login(usersRepository, email, password) {

  if (!isEmail(email)) {
    return createResponse(false, 'Formato de correo electrónico no valido.');
  }

  const user = await usersRepository.getUserByEmail(email);
  if (!user) {
    return createResponse(false, 'Esta dirección de correo electrónico no está asociada a una cuenta.');
  }

  if (!user.active) {
    return createResponse(false, 'Cuenta actualmente desactivada');
  }

  const isMatched = await matchString(password, user.password);
  const accessToken = generateAccessToken({ id: user.id, role: user.role });

  return createResponse(isMatched, isMatched ? accessToken : 'Correo o contraseña incorrecta.');
}

async function verifyAccount(usersRepository, secretToken) {
  const user = await usersRepository.getUserBySecretToken(secretToken);
  if (user) {
    await usersRepository.verifyAccount(user.id);
    return createResponse(true, 'Cuenta verificada.');
  } else {
    return createResponse(false, 'Error verificando cuenta');
  }
}

async function completeUserProfile(usersRepository, photoPath, userId) {
  if (photoPath) {
    const responseCloudinary = await uploadImage(photoPath);
    const photo = {
      public_id: responseCloudinary.public_id,
      secure_url: responseCloudinary.secure_url
    }
    await usersRepository.uploadProfilePhoto(userId, photo);
    await fs.unlink(photoPath);
    return createResponse(true, 'Perfil completado con éxito.');
  } else {
    return createResponse(false, 'Es obligatorio cargar una fotografía del usuario en este paso.');
  }

}
module.exports = {
  signUp,
  login,
  verifyAccount,
  completeUserProfile
};
