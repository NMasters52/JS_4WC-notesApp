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
        //create div for notes 
        const noteDiv = document.createElement('div');
        elements.displayNotes.appendChild(noteDiv);
        noteDiv.classList.add('note-item');
        //add note text 
        const listItem = createElement('p', note.text, null, note.id);
        noteDiv.appendChild(listItem);
        //add edit btn
        const editBtn = createElement('button', "edit", () => editNote(note.id));
        noteDiv.appendChild(editBtn);
        //add delete btn
        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = "delete";
        deleteBtn.addEventListener('click', (() => deleteBtnHandler(note.id) ));
        noteDiv.appendChild(deleteBtn);
    })
}

function createElement(el, text, event, id) {
    const element = document.createElement(el);
    if (text) {
        element.innerText = text;
    }
    if (id) {
        element.id = id;
    }
    if (event) {
        element.addEventListener('click', event);
    }
    return element;
}

function deleteBtnHandler(noteId) {
    const index = savedNotes.findIndex(note => noteId === note.id);
    if (index !== -1) {
        try {
            savedNotes.splice(index, 1);
            saveNotes();
            displayNotes();
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log(`Notes with the ID of ${noteId} could not be found`);
    }
}

function editNote(noteId) {
    const note = savedNotes.find(note => noteId === note.id)
    if (note) {
        try {
           const listItem = document.getElementById(`${noteId}`)
           let input = document.createElement('input');
           input.value = note.text;
           listItem.replaceWith(input);
           const saveBtn = document.createElement('button')
            saveBtn.innerText = "save";
            saveBtn.addEventListener('click', () => editSaveHandler(input.value, noteId))
            input.after(saveBtn)
        } catch (error) {
            console.log(error)
        }
    } else {
        listItem.innerText = `Edit failed for Note with the ID ${noteId}.`;
    }
}

function editSaveHandler(newText, noteId) {
    const noteIndex = savedNotes.findIndex(note => noteId === note.id);
    savedNotes[noteIndex].text = newText;
    saveNotes();
    displayNotes();
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(savedNotes));
}

//this is here to grab the notes and save them to the savedNotes array when the page loads
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