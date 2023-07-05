import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const NOTE_KEY = 'noteDB'

var gFilterBy = { txt: '' }
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
    return storageService.query(NOTE_KEY).then(notes => {
        if (gFilterBy.txt) {
            const regex = new RegExp(gFilterBy.txt, 'i')
            notes = notes.filter(note => regex.test(note.txt))
            // }
            // if (gFilterBy.minSpeed) {
            //     cars = cars.filter(car => car.maxSpeed >= gFilterBy.minSpeed)
            // }
            // if (gPageIdx !== undefined) {
            //     const startIdx = gPageIdx * PAGE_SIZE
            //     cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
            // }
            // if (gSortBy.maxSpeed !== undefined) {
            //     cars.sort(
            //         (c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed
            //     )
        // } else if (gSortBy.txt !== undefined) {
        //     notes.sort(
        //         (n1, n2) => n1.txt.localeCompare(n2.txt) * gSortBy.txt
        //     )
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
    // if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextNoteId(noteId) {
    return storageService.query(NOTE_KEY).then(notes => {
        var idx = notes.findIndex(note => note.id === noteId)
        if (idx === notes.length - 1) idx = -1
        return notes[idx + 1].id
    })
}

// function getCarCountBySpeedMap() {
//     return storageService.query(NOTE_KEY).then(cars => {
//         const carCountBySpeedMap = cars.reduce(
//             (map, car) => {
//                 if (car.maxSpeed < 120) map.slow++
//                 else if (car.maxSpeed < 200) map.normal++
//                 else map.fast++
//                 return map
//             },
//             { slow: 0, normal: 0, fast: 0 }
//         )
//         return carCountBySpeedMap
//     })
// }

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: utilService.getRandomColor()
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
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
                }
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(txt) {
    const note = getEmptyNote(txt)
    note.id = utilService.makeId()
    return note
}

