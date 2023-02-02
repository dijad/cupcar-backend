const validator = require('validator');

const LOCALES_PHONE_NUMBER = ['es-CO'];

function isEmail(email) {
  return validator.isEmail(email);
}

function isPhoneNumber(phoneNumber) {
  return validator.isMobilePhone(phoneNumber, LOCALES_PHONE_NUMBER);
}

module.exports = { isEmail, isPhoneNumber };
