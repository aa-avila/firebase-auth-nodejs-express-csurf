const fbModule = require('../firebase/firebaseConnect');
const fbAuth = fbModule.fbAuth;

module.exports = class MainCtrl {
  // modelo generador de error
  static async error_gen(req, res, next) {
    try {
      throw new Error('Algo salio mal! (error generado intencionalmente)');
    } catch (e) {
      console.log('Error: ' + e.message);
      const error = new Error(e.message);
      error.status = 413;
      next(error);
    }
  }

  // HOME page
  static async index_page(req, res, next) {
    try {
      const logged = req.logged;

      res.render('home', { title: 'Home', script: 'home.js', logged });
    } catch (e) {
      console.log('Error: ' + e.message);
      const error = new Error(e.message);
      error.status = 500;
      next(error);
    }
  }

  // Session Login
  static async sessionLogin(req, res) {
    try {
      const idToken = req.body.idToken.toString();
      //const expiresIn = 60 * 60 * 24 * 5 * 1000; //5 days
      const expiresIn = 60 * 60 * 1 * 1000; //1 hour
      //const expiresIn = 60 * 5 * 1000; //5 min

      fbAuth.createSessionCookie(idToken, { expiresIn }).then(
        (sessionCookie) => {
          const options = { maxAge: expiresIn, httpOnly: true };
          res.cookie('session', sessionCookie, options);
          res.end(JSON.stringify({ status: 'success' }));
        },
        (error) => {
          res.status(401).send('UNAUTHORIZED REQUEST!', error.message);
        }
      );
    } catch (e) {
      console.log(e.message);
      res.status(413).send(e.message);
    }
  }

  // Session Logout
  static async sessionLogout(req, res) {
    try {
      res.clearCookie('session');
      res.redirect('/');
    } catch (e) {
      console.log(e.message);
      res.status(413).send(e.message);
    }
  }
};
