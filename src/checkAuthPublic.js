const fbModule = require('./firebaseConnect');
const fbAuth = fbModule.fbAuth;

// isAuthPublic
const isAuthPublic = async (req, res, next) => {
    try {
        const sessionCookie = req.cookies.session || "";

        const sessionData = await fbAuth
            .verifySessionCookie(sessionCookie, true /** checkRevoked */);

        console.log('isAuthPublic: Estas logueado');

        req.logged = true;
        req.userId = sessionData.uid;
        req.userEmail = sessionData.email

        next();
    } catch (e) {
        console.log('Error en isAuthPublic:', e.message);
        req.logged = false;
        next();
    }
}

module.exports = isAuthPublic;