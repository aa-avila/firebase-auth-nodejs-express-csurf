const pKey = process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n');

const fbCredentials = {
  type: 'service_account',
  project_id: 'fir-auth-nodejs-express',
  private_key_id: process.env.FB_PRIVATE_KEY_ID,
  private_key: pKey,
  client_email:
    'firebase-adminsdk-8qwve@fir-auth-nodejs-express.iam.gserviceaccount.com',
  client_id: '106927688021414631990',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8qwve%40fir-auth-nodejs-express.iam.gserviceaccount.com'
};

module.exports = fbCredentials;
