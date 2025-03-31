const elements = {
    input: document.getElementById('noteInput'),
    btnSaveNote: document.getElementById('saveNote'),
    displayNotes: document.getElementById('notesDisplay')
}

let savedNotes = [];

function saveNoteHandler() {
    let note = new Note(elements.input.value);
    savedNotes.push(note);
    elements.input.value ='';
    saveNotes();
   displayNotes();
}

function displayNotes() {
    elements.displayNotes.innerHTML ='';
    savedNotes.map(note => {
      const  listItem = document.createElement('p')
        listItem.innerText = note.text;
        elements.displayNotes.appendChild(listItem);
    })
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(savedNotes));
}

function getNotes(){
  let storedNotes = localStorage.getItem("notes");
   if (storedNotes) {
 const  parsedNotes =  JSON.parse(storedNotes);
 savedNotes = parsedNotes.map(note => new Note(note.text, note.id));
   }
}

class Note {
    constructor(text, id) {
        this.id = id || crypto.randomUUID();
        this.text = text || "no id";
    }
}

function initializeApp() {
    getNotes();
    displayNotes();
    elements.btnSaveNote.addEventListener('click', saveNoteHandler);
}

initializeApp();