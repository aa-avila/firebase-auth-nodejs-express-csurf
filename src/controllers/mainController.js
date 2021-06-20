// const TasksService = require('../services/tasksService');
const fbAuth = require('../firebaseConnect');

module.exports = class MainCtrl {
    //
    static async index_page(req, res) {
        try {
            // const data = await TasksService.tasksAll();
            res.render('home', { title: 'FB Auth + ExpressJS', script: 'home.js' });
        } catch (e) {
            console.log(e.message);
            res.status(413).send(e.message);
        }
    }

    //
    static async login_page(req, res) {
        try {
            // const data = await TasksService.tasksAll();
            res.render('login', { layout: 'loginLayout', title: 'FB Auth + ExpressJS', script: 'login.js' });

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
                        res.status(401).send("UNAUTHORIZED REQUEST!");
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
            res.redirect("/login");

        } catch (e) {
            console.log(e.message);
            res.status(413).send(e.message);
        }
    }

    //
    static async profile_page(req, res) {
        try {
            // const data = await TasksService.tasksAll();
            res.render('profile', { title: 'FB Auth + ExpressJS', script: 'profile.js' });

        } catch (e) {
            console.log(e.message);
            res.status(413).send(e.message);
        }
    }
}