const elements = {
    input: document.getElementById('noteInput'),
    btnSaveNote: document.getElementById('saveNote'),
    displayNotes: document.getElementById('notesDisplay')
}

let savedNotes = [];

function saveNoteHandler() {
    const newNote = elements.input.value;
    savedNotes.push(newNote);
    elements.input.value ='';
    saveNotes();
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

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(savedNotes));
}

function getNotes(){
  let storedNotes = localStorage.getItem("notes");
   if (storedNotes) {
   savedNotes =  JSON.parse(storedNotes);
   }
}

function initializeApp() {
    getNotes();
    displayNotes();
    elements.btnSaveNote.addEventListener('click', saveNoteHandler);
}

initializeApp();