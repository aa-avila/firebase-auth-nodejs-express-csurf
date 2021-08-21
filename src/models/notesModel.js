// - getAllNotes
// - getNote
// - addNote
// - updateNote
// - deleteNote

const fbModule = require('../firebaseConnect');
const db = fbModule.db;
const FieldValue = fbModule.FieldValue;

module.exports = class NotesModel {
    /** getAllNotes */
    static async getAllNotes(uid) {
        try {
            const notesRef = db.collection('users/' + uid + '/notes');
            const snapshot = await notesRef.get();

            let notesData = [];
            snapshot.forEach(doc => {
                notesData.push(doc.data());
            });

            //console.log(notesData);

            return notesData;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    /** getNote */
    static async getNote(uid, id) {
        try {
            const noteRef = db.collection('users/' + uid + '/notes').doc(id);
            const noteData = await noteRef.get();
            //console.log(noteData);

            return noteData;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    /** addNote */
    static async addNote(uid, data) {
        try {

            // const response = await db.collection('users/' + uid + '/notes').add(data);

            const newDocRef = db.collection('users/' + uid + '/notes').doc();
            const response = await newDocRef.set({
                title: data.title,
                description: data.description,
                id: newDocRef.id
            });

            // Update the timestamp field with the value from the server
            // const res = await newDocRef.update({
            //     timestamp: FieldValue.serverTimestamp()
            // });

            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    /** updateNote */
    static async updateNote(uid, id, data) {
        try {
            const noteRef = db.collection('users/' + uid + '/notes').doc(id);
            const response = await noteRef.update({
                title: data.title,
                description: data.description,
            });

            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }


    /** deleteNote */
    static async deleteNote(uid, id) {
        try {
            const noteRef = db.collection('users/' + uid + '/notes').doc(id);
            const response = await noteRef.delete();

            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
}