const sgMail = require('@sendgrid/mail');

function initMailer() {

  const sgAPIKey = process.env.SG_KEY;

  sgMail.setApiKey(sgAPIKey);

  return sgMail;
}

module.exports = { initMailer };
