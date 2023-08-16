const bcrypt = require('bcrypt');

const { VALIDATION_CASES_PASS } = require('./constants');

async function encryptString(password) {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS_BCRYPT) || 20);
  const encryptedPass = await bcrypt.hash(password, salt);
  return encryptedPass;
}

async function matchString(passwordIn, password) {
  return await bcrypt.compare(passwordIn, password);
}

function getTypeFailValidationPass(validationFail) {
  return VALIDATION_CASES_PASS[validationFail];
}

function generateRandomString () {
  return Math.floor(Math.random() * Date.now()).toString(36);
}

function validateNullsInArrayOfDataSignUp(array) {
  if (array.every((campo) => campo !== null)) {
    // Verificar que el campo de array tenga al menos un elemento
    if (Array.isArray(array[array.length - 1]) && array[array.length - 1].length > 0) {
      return false;
    }
  }
  return true;
}

function validateNullsInArrayOfData(array) {
  if (array.every((campo) => campo !== null)) {
    return false;
  }
  return true;
}

function validateAllNullsInArrayOfData(array) {
  return array.every( item => item === null);
}

function createResponse(status, data) {
  return { status, data };
}

module.exports = {
  encryptString,
  getTypeFailValidationPass,
  matchString,
  generateRandomString,
  validateNullsInArrayOfDataSignUp,
  validateNullsInArrayOfData,
  validateAllNullsInArrayOfData,
  createResponse
};
