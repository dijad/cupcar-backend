const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore(process.env.GOOGLE_APPLICATION_CREDENTIALS);

module.exports = firestore;
