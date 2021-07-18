const fbAuth = require('./firebaseConnect');

// isAuthPublic
const isAuthPublic = async (req, res, next) => {
    try {
        const sessionCookie = req.cookies.session || "";

        const sessionData = await fbAuth
            .verifySessionCookie(sessionCookie, true /** checkRevoked */);

        console.log('Estas logueado');

        req.logged = true;
        req.userId = sessionData.uid;
        req.userEmail = sessionData.email

        next();
    } catch (e) {
        console.log('Error en isAuth:', e.message);
        req.logged = false;
        next();
    }
}

module.exports = isAuthPublic;