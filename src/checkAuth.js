const fbAuth = require('./firebaseConnect');

// isAuth
const isAuth = async (req, res, next) => {
    try {
        const sessionCookie = req.cookies.session || "";

        const sessionData = await fbAuth
            .verifySessionCookie(sessionCookie, true /** checkRevoked */);

        console.log('Estas logueado');

        req.logged = true;
        req.userId = sessionData.uid;
        req.userEmail = sessionData.email;

        next();
    } catch (e) {
        console.log('Error en isAuth:', e.message);
        res.redirect('/');
    }
}

module.exports = isAuth;