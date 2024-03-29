const { matchString, getTypeFailValidationPass, generateRandomString, validateNullsInArrayOfDataSignUp, encryptString, createResponse } = require('../utils/utils');
const ValidatorPass = require('../utils/validatorPass');
const { isEmail, isPhoneNumber } = require('../utils/validator');
const { generateAccessToken } = require('../utils/jwt');
const { sendValidationSignUp } = require('../usecases/mailing-usecase');
const { uploadImage, deleteImage } = require('../frameworks/images-store/cloudinary');

const fs = require('fs-extra');

async function signUp(usersRepository, name = null, lastname = null, email, password, gender = null, phone, role, favoriteOrigins) {

  const payloadSignUp = [name, lastname, gender, favoriteOrigins];

  if (validateNullsInArrayOfDataSignUp(payloadSignUp)) {
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
    favoriteOrigins
  };
  const responseSignUp = await usersRepository.signUp(newUser);
  sendValidationSignUp(newUser.email, token);

  const message = responseSignUp ? 'Registro realizado satisfactoriamente.' : 'No se pudo realizar el registro con éxito.';
  return createResponse(responseSignUp, message);
}

async function login(usersRepository, email, password) {

  if (!isEmail(email)) {
    return createResponse(false, 'Formato de correo electrónico no válido.');
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

  if (!user) {
    return createResponse(false, 'Error verificando cuenta');
  }

  const successMessage = 'Cuenta verificada.';
  const errorMessage = 'Error verificando cuenta';
  const res = await usersRepository.verifyAccount(user.id);

  return createResponse(res, res ? successMessage : errorMessage);
}

async function completeUserProfile(usersRepository, photoPath, userId) {
  if (photoPath) {
    const user = await usersRepository.getUserById(userId);
    const responseCloudinaryUpload = await uploadImage(photoPath);
    const photo = {
      public_id: responseCloudinaryUpload.public_id,
      secure_url: responseCloudinaryUpload.secure_url
    }
    if (user.photo) {
      await deleteImage(user.photo.public_id);
    }
    await usersRepository.uploadProfilePhoto(userId, photo);
    await fs.unlink(photoPath);
    return createResponse(true, 'Foto actualizada con éxito.');
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
