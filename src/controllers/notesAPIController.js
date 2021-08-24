const NotesService = require("../services/notesService");

module.exports = class NotesCtrl {
    /** Get All Notes */
    static async getAllNotes(req, res) {
        try {
            // Auth state & current user id
            const logged = req.logged;
            const userId = req.userId;

            // Get notes
            const notes = await NotesService.getAllNotes(userId);

            /** Pasa el csrfToken a la pagina (acciones notes) */
            // const csrfToken = req.csrfToken();

            res.send(notes);
        } catch (e) {
            console.log('Error: ' + e.message);
            res.status(500).send({'Error': e.message})
        }
    }

    /** Get Note */
    static async getNote(req, res) {
        try {
            // Auth state & current user id
            const userId = req.userId;
            const noteId = req.params.id;

            const note = await NotesService.getNote(userId, noteId);

            res.send(note);
        } catch (e) {
            console.log('Error: ' + e.message);
            res.status(500).send({'Error': e.message})
        }
    }

    /** Add Note */
    static async addNote(req, res) {
        try {
            // Auth state & current user id
            const userId = req.userId;
            const formData = req.body;

            // console.log(formData);

            const noteData = {
                title: formData.title,
                description: formData.description
            }

            const response = await NotesService.addNote(userId, noteData);

            res.send(response);
        } catch (e) {
            console.log('Error: ' + e.message);
            res.status(500).send({'Error': e.message})
        }
    }

    /** Update Note */
    static async updateNote(req, res) {
        try {
            // Auth state & current user id
            const userId = req.userId;
            const body = req.body;

            const noteId = req.params.id;

            const noteData = {
                title: body.title,
                description: body.description
            }

            const response = await NotesService.updateNote(userId, noteId, noteData);

            res.send(response);
        } catch (e) {
            console.log('Error: ' + e.message);
            res.status(500).send({'Error': e.message})
        }
    }

        /** Delete Note */
        static async deleteNote(req, res) {
            try {
                // Auth state & current user id
                const userId = req.userId;
                const noteId = req.params.id;
    
                const response = await NotesService.deleteNote(userId, noteId);
    
                res.send(response);
            } catch (e) {
                console.log('Error: ' + e.message);
                res.status(500).send({'Error': e.message})
            }
        }
}