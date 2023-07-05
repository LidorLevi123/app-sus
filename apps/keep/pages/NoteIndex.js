import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import NotePreview from '../cmps/NotePreview.js'
import NoteTxt from '../cmps/NoteTxt.js'
import { utilService } from '../../../services/util.service.js'
import NoteEdit from './NoteEdit.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
    template: `
  <div class="note-container">
  <NoteFilter @filter="setFilterBy" />
      <h2>Notes:</h2>
    <li v-for="note in notes" :key="note.id">
        <NotePreview :note="note" @deleteNote="deleteNote" @changeColor="changeNoteColor" @editNote="editNote" />
      </li>
    <NoteTxt @addNote="addNote" v-if="!isEditing" />
    <NoteEdit v-else :note="editingNote" @updateNote="updateNote" @cancelEdit="cancelEdit" />
  </div>

    `,
    components: {
        NotePreview,
        NoteTxt,
        NoteEdit,
        NoteFilter,
    },
    data() {
        return {
            notes: [],
            isEditing: false,
            editingNote: null,
            filterBy: {
                txt: '', // Add other filter properties as needed
              },
        }
    },
    created() {
        this.fetchNotes();
      },
    mounted() {
        this.fetchNotes()
    },
    methods: {
        fetchNotes() {
            noteService.query().then((notes) => {
                this.notes = notes.map((note) => ({
                    ...note,

                }))
            })
        },
        addNote(note) {
            noteService.save(note).then(() => {
                this.fetchNotes()
            })
        },
        deleteNote(note) {
            noteService.remove(note.id).then(() => {
                this.fetchNotes()
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
            console.log(note)
        },
        editNote(note) {
            this.isEditing = true
            this.editingNote = note
        },
        updateNote(updatedNote) {
            noteService.save(updatedNote).then(() => {
                showSuccessMsg('Note updated successfully!')
                this.isEditing = false
                this.editingNote = null
                this.fetchNotes()
            })
        },
        cancelEdit() {
            this.isEditing = false
            this.editingNote = null
        },
        setFilterBy(filterBy) {
            noteService.setFilterBy(filterBy);
            this.filterBy = noteService.getFilterBy();
            this.fetchNotes()
          },
    },

}