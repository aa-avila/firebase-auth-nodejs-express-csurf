const fbAuth = require('./firebaseConnect');

// isAuth
const isAuth = async (req, res, next) => {
    try {
        const sessionCookie = req.cookies.session || "";

        const sessionData = await fbAuth
            .verifySessionCookie(sessionCookie, true /** checkRevoked */);

        console.log('isAuth: Estas logueado');

        req.logged = true;
        req.userId = sessionData.uid;
        req.userEmail = sessionData.email;

        next();
    } catch (e) {
        console.log('Error en isAuth:', e.message);

        res.redirect('/'); // redirecciona a home en caso de no estar logueado

        // Ejemplo de propagacion de error hacia el error handler y mostrar pagina de error en el cliente:
        // const error = new Error('No estás logueado/a. Ingresa o registrate para acceder a tu contenido privado.');
        // error.status = 401;
        // next(error);
    }
}

module.exports = isAuth;