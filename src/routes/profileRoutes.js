const router = require('express').Router();
const ProfileCtrl = require('../controllers/profileController');
const isAuth = require('../checkAuth');

router.get('/profile', isAuth, ProfileCtrl.profile_page);
router.post('/profileEdit', isAuth, ProfileCtrl.updateProfile)

module.exports = router;