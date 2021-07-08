const admin = require('firebase-admin');
const serviceAccount = require('./firebaseCredentials.json');

// FIREBASE ADMIN
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const fbAuth = admin.auth();

module.exports = fbAuth;