import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import NotePreview from '../cmps/NotePreview.js'
import NoteTxt from '../cmps/NoteTxt.js'
import NoteAdd from '../cmps/NoteAdd.js'
import NoteVideo from '../cmps/NoteVideo.js'
import { utilService } from '../../../services/util.service.js'
import NoteEdit from './NoteEdit.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
    template: `
  <div class="inputs">
    <NoteFilter @filter="setFilterBy" />
    <NoteAdd @addNote="addNote" v-if="!isEditing" />
    <NoteEdit v-else :note="editingNote" @updateNote="updateNote" @cancelEdit="cancelEdit" />
  </div>
  <div class="note-container">
    <li v-for="note in filteredNotes" :key="note.id">
      <NotePreview
        :note="note"
        @deleteNote="deleteNote"
        @changeColor="changeNoteColor"
        @editNote="editNote"
        @togglePinNote="togglePinNote"
      />
    </li>
  </div>

    `,
    components: {
        NotePreview,
        NoteTxt,
        NoteEdit,
        NoteFilter,
        NoteAdd,
        NoteVideo
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
        this.fetchNotes()
    },
    mounted() {
        this.fetchNotes()
    },
    computed: {
        filteredNotes() {
            const pinnedNotes = this.notes.filter((note) => note.isPinned)
            const unpinnedNotes = this.notes.filter((note) => !note.isPinned)
            return [...pinnedNotes, ...unpinnedNotes]
        }
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
            noteService.setFilterBy(filterBy)
            this.filterBy = noteService.getFilterBy()
            this.fetchNotes()
        },
        togglePinNote(note) {
            note.isPinned = !note.isPinned
            noteService.save(note).then(() => {
                this.fetchNotes()
            })
        }
        
    }
}