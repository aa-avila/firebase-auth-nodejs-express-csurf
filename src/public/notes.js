/** Select CSRF Token */
let csrfToken = '';
const getCsrfToken = () => {
    csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    console.log(csrfToken);
}

//
let currentNoteId = '';
let currentNoteTitle = '';
let currentNoteDescription = '';
//

/** Handle EDIT note (card button) */
const handleEditNote_cardBtn = async (id, title, description) => {
    currentNoteId = id;
    currentNoteTitle = title;
    currentNoteDescription = description;

    document.querySelector('#editNote-title').value = title;
}

/** Handle EDIT note (submit form) */
const handleEditNote_submit = async () => {
    // Armar url host/notes/id
    const url = '/notes/' + currentNoteId;
    // const url = window.location.href + '/' + id;

    /** get form values */
    const editNoteTitle = document.querySelector('#editNote-title');
    const editNoteDescription = document.querySelector('#editNote-desc');

    /** Pack data */
    const data = {
        title: editNoteTitle,
        description: editNoteDescription
    }

    // http PUT
    const response = await axios.put(url, data);

    // Recargar /notes
    window.location.reload();
}

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





window.addEventListener("DOMContentLoaded", () => {
    console.log('Hola en notes');
    getCsrfToken();


});
