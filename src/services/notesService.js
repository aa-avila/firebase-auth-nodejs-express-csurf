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

    /** getNote */
    static async getNote(uid, id) {
        try {
            // get note
            const noteData = await NotesModel.getNote(uid, id);

            return noteData;
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

    /** updateNote */
    static async updateNote(uid, id, data) {
        try {
            const response = await NotesModel.updateNote(uid, id, data);

            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    /** deleteNote */
    static async deleteNote(uid, id) {
        try {
            const response = await NotesModel.deleteNote(uid, id);

            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
}