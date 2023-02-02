const NOT_VALID_PASS = ['Passw0rd', 'Password123', 'Password', 'password', '123123']

const VALIDATION_CASES_PASS = {
  'uppercase': 'La contraseña debe contener al menos una letra mayúscula.',
  'min': 'La contraseña debe tener al menos 8 caracteres.',
  'digits': 'La contraseña debe tener al menos 1 digitos.',
  'spaces': 'La contraseña no debe tener espacios.',
  'max': 'La contraseña debe tener máximo 30 caracteres.',
  'oneOf' : `No son válidas las siguientes contraseñas; ${NOT_VALID_PASS.join(', ')}`
}


module.exports = { VALIDATION_CASES_PASS, NOT_VALID_PASS }