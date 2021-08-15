const { Router } = require('express');
const router = Router();
const MainCtrl = require('../controllers/mainController');
const isAuth = require('../checkAuth');
const isAuthPublic = require('../checkAuthPublic');


router.get('/', isAuthPublic, MainCtrl.index_page);
router.post('/sessionLogin', MainCtrl.sessionLogin);
router.get('/sessionLogout', MainCtrl.sessionLogout);
router.get('/profile', isAuth, MainCtrl.profile_page);
router.post('/profileEdit', isAuth, MainCtrl.updateProfile)
router.get('/error', MainCtrl.error_gen);



module.exports = router;