const NotesModel = require("../models/notesModel");

module.exports = class NotesService {
    /** getAllNotes */
    static async getAllNotes(uid) {
        try {
            // get notes
            const notesData = await NotesModel.getAllNotes(uid);

            return notesData;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

        /** addNote */
        static async addNote(uid, data) {
            try {
                const response = await NotesModel.addNote(uid, data);
    
                return response;
            } catch (error) {
                console.log(error.message);
                return error.message;
            }
        }
}