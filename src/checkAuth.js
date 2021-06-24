const fbAuth = require('./firebaseConnect');

// isAuth
const isAuth = async (req, res, next) => {
    try {
        const sessionCookie = req.cookies.session || "";

        const sessionData = await fbAuth
            .verifySessionCookie(sessionCookie, true /** checkRevoked */);

        console.log('Estas logueado');
        //console.log(data);
        //console.log("[isAuth] userId:", sessionData.uid);
        //console.log("[isAuth] userEmail:", sessionData.email);

        next();
    } catch (e) {
        console.log('Error en isAuth:', e.message);
        res.redirect('/login');
    }
}

module.exports = isAuth;