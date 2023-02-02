const validator = require('validator');

const LOCALES_PHONE_NUMBER = ['es-CO'];
const GENDERS = ['MALE', 'FEMALE', 'OTHER'];

function isEmail(email) {
  return validator.isEmail(email);
}

function isPhoneNumber(phoneNumber) {
  return validator.isMobilePhone(phoneNumber, LOCALES_PHONE_NUMBER);
}

function validGender(gender) {
  return GENDERS.includes(gender.toUpperCase()) ? true : false;
}

module.exports = { isEmail, isPhoneNumber, validGender };
