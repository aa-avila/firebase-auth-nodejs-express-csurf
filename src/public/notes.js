/** Select CSRF Token */
/*
let csrfToken = '';
const getCsrfToken = () => {
    csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    console.log(csrfToken);
}
*/


/** Handle EDIT note (card button) */
let currentNoteId = '';
let currentNoteTitle = '';
let currentNoteDescription = '';

const handleEditNote_cardBtn = async (id, title, description) => {
    currentNoteId = id;
    currentNoteTitle = title;
    currentNoteDescription = description;

    document.querySelector('#editNote-title').value = title;
    document.querySelector('#editNote-desc').value = description;
}

/** Handle EDIT note (submit form) */
const editNoteForm = document.querySelector("#editNote-form");

editNoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Armar url host/notes/id
    const url = '/notes/' + currentNoteId;
    // const url = window.location.href + '/' + id;

    /** get form values */
    const editNoteTitle = document.querySelector('#editNote-title').value;
    const editNoteDescription = document.querySelector('#editNote-desc').value;

    /** Pack data */
    const data = {
        title: editNoteTitle,
        description: editNoteDescription
    }

    // http PUT
    const response = await axios.put(url, data);

    // Recargar /notes
    window.location.reload();
});

/** Handle DELETE note */
const handleDeleteNote = async (id) => {
    // Armar url host/notes/id
    const url = '/notes/' + id;
    // const url = window.location.href + '/' + id;

    // http DELETE
    const response = await axios.delete(url);

    // Recargar /notes
    window.location.reload();
}

/************************************************* */
window.addEventListener("DOMContentLoaded", () => {
    console.log('Hola en notes');
    // getCsrfToken();
});
