import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const NOTE_KEY = 'noteDB'

var gFilterBy = { txt: '', type: '' }
var gSortBy = { txt: 1 }
var gPageIdx

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getNextNoteId,
    getFilterBy,
    setFilterBy,

}
window.noteService = noteService

function query() {
    return storageService.query(NOTE_KEY).then((notes) => {
      if (gFilterBy.txt || gFilterBy.type) {
        notes = notes.filter((note) => {
          const txtMatch = !gFilterBy.txt || note.info.title.toLowerCase().includes(gFilterBy.txt.toLowerCase())
          const typeMatch = !gFilterBy.type || note.type === gFilterBy.type
          return txtMatch && typeMatch
        })
      }
  
      return notes
    })
  }

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevNoteId(note))
}

function _setNextPrevNoteId(note) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            const noteIdx = notes.findIndex(currNote => currNote.id === note.id)
            note.nextNoteId = notes[noteIdx + 1] ? notes[noteIdx + 1].id : notes[0].id
            note.prevNoteId = notes[noteIdx - 1]
                ? notes[noteIdx - 1].id
                : notes[notes.length - 1].id
            return note
        })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(txt = '') {
    return { id: '', txt }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.type !== undefined) gFilterBy.type = filterBy.type
    return gFilterBy
  }

function getNextNoteId(noteId) {
    return storageService.query(NOTE_KEY).then(notes => {
        var idx = notes.findIndex(note => note.id === noteId)
        if (idx === notes.length - 1) idx = -1
        return notes[idx + 1].id
    })
}


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n105',
                createdAt: 2323232,
                type: 'NoteTxt',
                isPinned: false,
                info: {
                    txt: 'Discuss project timeline and deliverables.',
                    title: 'very important!'
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            },
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                info: {
                    txt: 'Fullstack Me Baby!',
                    title: 'nuuuuuuuu'
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://api.memegen.link/images/buzz/memes/memes_everywhere.gif',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            },
            {
                id: 'n107',
                type: 'NoteVideo',
                isPinned: false,
                info: {
                    url: 'https://www.youtube.com/watch?v=5harlhiqleY',
                    title: 'for today'
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            },   
             {
                id: 'n111',
                type: 'NoteMap',
                isPinned: false,
                info: {
                    lat: 32.1416,
                    lng: 34.831213,
                    title: 'Pukis house'
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            },
            {
                id: 'n202',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://api.memegen.link/images/both/width_or_height/why_not_both~q.png',
                    title: 'Pain'
                },
                style: {
                    backgroundColor: utilService.getRandomColor()
                }
            },
            
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(txt) {
    const note = getEmptyNote(txt)
    note.id = utilService.makeId()
    return note
}

