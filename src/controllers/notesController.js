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

    /** Get Note */
    static async getNote(req, res, next) {
        try {
            // Auth state & current user id
            const userId = req.userId;
            const noteId = req.params.id;

            const response = await NotesService.getNote(userId, noteId);

            res.send(response);
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 500;
            next(error);
        }
    }

    /** Add Note */
    static async addNote(req, res, next) {
        try {
            // Auth state & current user id
            const userId = req.userId;
            const formData = req.body;

            const noteData = {
                title: formData.newNote_title,
                description: formData.newNote_desc
            }

            const response = await NotesService.addNote(userId, noteData);

            res.redirect('/notes');
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 500;
            next(error);
        }
    }

    /** Update Note */
    static async updateNote(req, res, next) {
        try {
            // Auth state & current user id
            const userId = req.userId;
            const body = req.body;

            const noteId = req.params.id;

            const noteData = {
                title: body.note_title,
                description: body.note_desc
            }

            const response = await NotesService.updateNote(userId, noteId, noteData);

            res.redirect('/notes');
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 500;
            next(error);
        }
    }

        /** Delete Note */
        static async deleteNote(req, res, next) {
            try {
                // Auth state & current user id
                const userId = req.userId;
                const noteId = req.params.id;
    
                const response = await NotesService.deleteNote(userId, noteId);
    
                res.send(response);
            } catch (e) {
                console.log('Error: ' + e.message);
                const error = new Error(e.message);
                error.status = 500;
                next(error);
            }
        }
}