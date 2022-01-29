const admin = require('firebase-admin');
const serviceAccount = require('./firebaseCredentials');

// FIREBASE ADMIN
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const fbAuth = admin.auth();
const db = admin.firestore();

module.exports = { admin, fbAuth, db };
