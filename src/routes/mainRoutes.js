const router = require('express').Router();
const MainCtrl = require('../controllers/mainController');
const isAuthPublic = require('../checkAuthPublic');

router.get('/', isAuthPublic, MainCtrl.index_page);
router.post('/sessionLogin', MainCtrl.sessionLogin);
router.get('/sessionLogout', MainCtrl.sessionLogout);
router.get('/error', MainCtrl.error_gen);

module.exports = router;