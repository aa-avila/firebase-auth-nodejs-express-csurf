const handleDeleteNote = async (id) => {
    // Armar url host/notes/id
    const url = window.location.href + '/' + id;

    // http DELETE
    const response = await axios.delete(url);

    // Recargar /notes
    window.location.reload();
}