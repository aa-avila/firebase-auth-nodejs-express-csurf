const { Router } = require('express');
const router = Router();
const MainCtrl = require('../controllers/mainController');
const isAuth = require('../checkAuth');


router.get('/', MainCtrl.index_page);
router.get('/login', MainCtrl.login_page);
router.post('/sessionLogin', MainCtrl.sessionLogin);
router.get('/sessionLogout', MainCtrl.sessionLogout);
router.get('/profile', isAuth, MainCtrl.profile_page);


// Public
// router.get("/login", function (req, res) {
//     res.render("login", {layout: 'loginLayout', script: 'login.js'});
// });

// router.get("/signup", function (req, res) {
//     res.render("signup.html");
// });

// router.post("/sessionLogin", (req, res) => {
//     const idToken = req.body.idToken.toString();

//     //const expiresIn = 60 * 60 * 24 * 5 * 1000; //5 days
//     //const expiresIn = 60 * 60 * 1 * 1000; //1 hour
//     const expiresIn = 60 * 5 * 1000; //5 min

//     fbAuth
//         .createSessionCookie(idToken, { expiresIn })
//         .then(
//             (sessionCookie) => {
//                 const options = { maxAge: expiresIn, httpOnly: true };
//                 res.cookie("session", sessionCookie, options);
//                 res.end(JSON.stringify({ status: "success" }));
//             },
//             (error) => {
//                 res.status(401).send("UNAUTHORIZED REQUEST!");
//             }
//         );
// });

// // Private
// router.get("/profile", function (req, res) {
//     res.render("profile.html");
// });

// router.get("/private-content-2", function (req, res) {
//     res.render("private-content-2.html");
// });

// router.get("/sessionLogout", (req, res) => {
//     res.clearCookie("session");
//     res.redirect("/login");
// });

// router.get('/', TasksCtrl.tasksAll);
// router.post('/new-task', TasksCtrl.tasksAdd);
// router.delete('/delete-task/:id', TasksCtrl.tasksDelete);
// router.put('/do-task/:id', TasksCtrl.tasksDone);
// router.put('/undo-task/:id', TasksCtrl.tasksUndo);

module.exports = router;