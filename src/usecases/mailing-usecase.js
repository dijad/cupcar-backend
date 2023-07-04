const appRoot = require('app-root-path');
const { initMailer } = require(appRoot + '/src/frameworks/mailing/sendgrid');


async function sendMail(emailTo, subject, text, html) {
  const mailer = initMailer();
  const msg = {
    to: emailTo, // Change to your recipient
    from: process.env.SG_SENDER, // Change to your verified sender
    subject,
    text,
    html,
  }
  try {
    await mailer.send(msg);
  }catch(error){
    console.error(error)
  }
}

async function sendValidationSignUp(userMail, token) {
    const subject = `Verificación de cuenta BigRoads`;
    const text = `Gracias por registrarte en BigRoads. Para validar tu cuenta, ingresa al siguiente enlace: ${process.env.URL_BASE}/v1/verify-account?secretToken=${token}`;
    const html = text;
    await sendMail(userMail, subject, text, html);
}

module.exports = { sendValidationSignUp };
