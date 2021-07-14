const { Router } = require('express');
const router = Router();
const MainCtrl = require('../controllers/mainController');
const isAuth = require('../checkAuth');


router.get('/', MainCtrl.index_page);
router.post('/sessionLogin', MainCtrl.sessionLogin);
router.get('/sessionLogout', MainCtrl.sessionLogout);
router.get('/profile', isAuth, MainCtrl.profile_page);

// router.get("/signup", function (req, res) {
//     res.render("signup.html");
// });


module.exports = router;