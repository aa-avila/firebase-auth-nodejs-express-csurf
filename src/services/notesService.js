const NotesModel = require("../models/notesModel");

module.exports = class NotesService {
    /** getAllNotes */
    static async getAllNotes(uid) {
        try {
            // get notes
            let notesData = await NotesModel.getAllNotes(uid);

            return notesData;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
}