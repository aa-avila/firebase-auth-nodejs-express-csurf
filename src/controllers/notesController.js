const NotesService = require("../services/notesService");

module.exports = class NotesCtrl {
    /** Notes Page */
    static async notes_page(req, res, next) {
        try {
            // Auth state & current user id
            const logged = req.logged;
            const userId = req.userId;

            // Get personal data
            const notes = await NotesService.getAllNotes(userId);

            /** Pasa el csrfToken a la pagina (acciones notes) */
            const csrfToken = req.csrfToken();

            res.render('notes', { title: 'Notas', script: 'notes.js', logged, userId, notes, csrfToken });
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 500;
            next(error);
        }
    }
}