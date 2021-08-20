const admin = require('firebase-admin');
const serviceAccount = require('./firebaseCredentials.json');

// FIREBASE ADMIN
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const fbAuth = admin.auth();
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

module.exports = { fbAuth, db, FieldValue };