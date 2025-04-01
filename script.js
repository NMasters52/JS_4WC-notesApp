const elements = {
    input: document.getElementById('noteInput'),
    btnSaveNote: document.getElementById('saveNote'),
    displayNotes: document.getElementById('notesDisplay')
}

let savedNotes = [];

function newNote(text) {
    return {
        id: crypto.randomUUID(),
        text: text
    }
}

function saveNoteHandler() {
    let text = elements.input.value;
    let note = newNote(text);
    savedNotes.push(note);
    elements.input.value ='';
    saveNotes();
   displayNotes();
}

function displayNotes() {
    elements.displayNotes.innerHTML ='';
    savedNotes.forEach(note => {
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
        try {
            savedNotes = JSON.parse(storedNotes);  
    } catch (error) {
            console.error("Error parsing notes from localStorage:", error);
            savedNotes = [];
        }
  } else {
    savedNotes = [];
  }
 

}


function initializeApp() {
    getNotes();
    displayNotes();
    elements.btnSaveNote.addEventListener('click', saveNoteHandler);
}

initializeApp();