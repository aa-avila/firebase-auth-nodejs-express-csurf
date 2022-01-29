const router = require('express').Router();
const NotesCtrl = require('../controllers/notesController');
const isAuth = require('../auth/checkAuth');

router.get('/notes', isAuth, NotesCtrl.notes_page);
router.post('/notes', isAuth, NotesCtrl.addNote);
router.get('/notes/:id', isAuth, NotesCtrl.getNote);
router.put('/notes/:id', isAuth, NotesCtrl.updateNote);
router.delete('/notes/:id', isAuth, NotesCtrl.deleteNote);

module.exports = router;
