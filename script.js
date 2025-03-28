const elements = {
    input: document.getElementById('noteInput'),
    btnSaveNote: document.getElementById('saveNote'),
    displayNotes: document.getElementById('notesDisplay')
}

const savedNotes = [];

function saveNoteHandler() {
    const newNote = elements.input.value;
    savedNotes.push(newNote);
    elements.input.value ='';
   displayNotes();
}

function displayNotes() {
    elements.displayNotes.innerHTML ='';
    savedNotes.map(note => {
      const  listItem = document.createElement('p')
        listItem.innerText = note;
        elements.displayNotes.appendChild(listItem);
    })
}

function initializeApp() {
    elements.btnSaveNote.addEventListener('click', saveNoteHandler);
}

initializeApp();