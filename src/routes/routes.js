const { Router } = require('express');
const router = Router();
const MainCtrl = require('../controllers/mainController');
const ProfileCtrl = require('../controllers/profileController');
const NotesCtrl = require('../controllers/notesController');
const isAuth = require('../checkAuth');
const isAuthPublic = require('../checkAuthPublic');


router.get('/', isAuthPublic, MainCtrl.index_page);
router.post('/sessionLogin', MainCtrl.sessionLogin);
router.get('/sessionLogout', MainCtrl.sessionLogout);
router.get('/error', MainCtrl.error_gen);

router.get('/profile', isAuth, ProfileCtrl.profile_page);
router.post('/profileEdit', isAuth, ProfileCtrl.updateProfile)

router.get('/notes', isAuth, NotesCtrl.notes_page);
//router.get('/note/:id', isAuth, NotesCtrl.getNote);
//router.post('/note/:id', isAuth, NotesCtrl.newNote);
//router.put('/note/:id', isAuth, NotesCtrl.updateNote);





module.exports = router;