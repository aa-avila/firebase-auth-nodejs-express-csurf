const fbAuth = require('../firebaseConnect');

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
            res.render('home', { title: 'Home', script: 'home.js', logged: req.logged });
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 413;
            next(error);
        }
    }

    // Profile Page
    static async profile_page(req, res) {
        try {
            const userId = req.userId;
            const userEmail = req.userEmail;

            res.render('profile', { title: 'Perfil', script: 'profile.js', logged: req.logged, user_id: userId, user_email: userEmail});
        } catch (e) {
            console.log(e.message);
            res.status(413).send(e.message);
        }
    }

    // Session Login
    static async sessionLogin(req, res) {
        try {
            const idToken = req.body.idToken.toString();
            //const expiresIn = 60 * 60 * 24 * 5 * 1000; //5 days
            //const expiresIn = 60 * 60 * 1 * 1000; //1 hour
            const expiresIn = 60 * 5 * 1000; //5 min

            fbAuth
                .createSessionCookie(idToken, { expiresIn })
                .then(
                    (sessionCookie) => {
                        const options = { maxAge: expiresIn, httpOnly: true };
                        res.cookie("session", sessionCookie, options);
                        res.end(JSON.stringify({ status: "success" }));
                    },
                    (error) => {
                        res.status(401).send("UNAUTHORIZED REQUEST!", error.message);
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
            res.clearCookie("session");
            res.redirect("/");

        } catch (e) {
            console.log(e.message);
            res.status(413).send(e.message);
        }
    }
}