import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import NotePreview from '../cmps/NotePreview.js'
import NoteTxt from '../cmps/NoteTxt.js'
import { utilService } from '../../../services/util.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
    template: `
  <div class="note-container">
    <h2>Notes:</h2>

      <li v-for="note in notes" :key="note.id">
        <NotePreview :note="note" @deleteNote="deleteNote" />
      </li>

    <NoteTxt @addNote="addNote" />
  </div>

    `,
    components: {
        NotePreview,
        NoteTxt,
    },
    data() {
        return {
            notes: [],
        }
    },
    mounted() {
        this.fetchNotes()
    },
    methods: {
        fetchNotes() {
            noteService.query().then((notes) => {
                this.notes = notes.map((note) => ({
                    ...note,
                    style: {
                        backgroundColor: utilService.getRandomColor(),
                    },
                }))
            })
        },
        addNote(note) {
            noteService.save(note).then(() => {
                this.loadNotes()
            })
        },
        deleteNote(note) {
            noteService.remove(note.id).then(() => {
                this.loadNotes()
            })
        },
        changeNoteColor(noteId, color) {
            console.log(color)
            const note = this.notes.find((note) => note.id === noteId)
            if (note) {
                note.style.backgroundColor = color
                noteService.save(note).then(() => {
                    showSuccessMsg('Note color updated successfully!')
                })
            }
        },
    },
}