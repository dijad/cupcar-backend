var passwordValidator = require('password-validator');
const { NOT_VALID_PASS } = require('./constants')

// Create a schema
var validator = new passwordValidator();

// Add properties to it
validator
  .is().min(8)                                    // Minimum length 8
  .is().max(30)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(1)                                // Must have at least 2 digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(NOT_VALID_PASS);

module.exports = validator;
