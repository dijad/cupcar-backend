const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

module.exports = firestore;
