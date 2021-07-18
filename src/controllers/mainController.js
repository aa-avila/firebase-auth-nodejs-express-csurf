const fbAuth = require('../firebaseConnect');

module.exports = class MainCtrl {
    //
    static async index_page(req, res) {
        try {
            res.render('home', { title: 'Home', script: 'home.js', logged: req.logged });
        } catch (e) {
            console.log(e.message);
            res.status(413).send(e.message);
        }
    }

    //
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

    //
    static async sessionLogout(req, res) {
        try {
            res.clearCookie("session");
            res.redirect("/");

        } catch (e) {
            console.log(e.message);
            res.status(413).send(e.message);
        }
    }

    //
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
}