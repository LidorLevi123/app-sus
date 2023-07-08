import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg, eventBus } from '../../../services/event-bus.service.js'
import NotePreview from '../cmps/NotePreview.js'
import NoteTxt from '../cmps/NoteTxt.js'
import NoteAdd from '../cmps/NoteAdd.js'
import NoteVideo from '../cmps/NoteVideo.js'
import NoteMap from '../cmps/NoteMap.js'
import { utilService } from '../../../services/util.service.js'
import NoteEdit from './NoteEdit.js'
import NoteDetails from './NoteDetails.js'
import NoteAudio from '../cmps/NoteAudio.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
    name: 'index',
    template: `
    <div class="notes-index" >

      <div class="inputs">
        <div class="notes-filter">
          <RouterView></RouterView>
          <NoteFilter @filter="setFilterBy" />
        </div>
        <div class="add-note-section">
          <NoteAdd @addNote="addNote" v-if="!isEditing" />
          <NoteEdit v-else :note="editingNote" @updateNote="updateNote" @cancelEdit="cancelEdit" />
        </div>
      </div>
      <div class="note-container">
        <li v-for="note in filteredNotes" :key="note.id">
          <NotePreview
            :note="note"
            @deleteNote="deleteNote"
            @changeColor="changeNoteColor"
            @editNote="editNote"
            @togglePinNote="togglePinNote"
            @copyNote="copyNote"
            @updateNoteLabel="updateNoteLabel"
          />
        </li>
      </div>
    </div>

    `,
    components: {
        NotePreview,
        NoteTxt,
        NoteEdit,
        NoteFilter,
        NoteAdd,
        NoteVideo,
        NoteMap,
        NoteDetails,
        NoteAudio


    },
    data() {
        return {

            notes: [],
            isEditing: false,
            editingNote: null,
            isModalOpen: false,
            selectedNote: null,
            filterBy: {
                txt: '', // Add other filter properties as needed
            },
        }
    },
    created() {
        this.fetchNotes()
        eventBus.on('dark-mode-toggled', this.toggleDarkMode)
    },
    beforeDestroy() {
        eventBus.off('dark-mode-toggled', this.toggleDarkMode)
      },
    watch: {
        notes: {
            deep: true,
            handler() {
                this.fetchNotes()
            },
        },
    },
    mounted() {
        this.fetchNotes()
    },
    computed: {
        filteredNotes() {
            const pinnedNotes = this.notes.filter((note) => note.isPinned)
            const unpinnedNotes = this.notes.filter((note) => !note.isPinned)
            return [...pinnedNotes, ...unpinnedNotes]
        },
        isDarkMode() {
            return this.$eventBus.isDarkMode || false
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

            const note = this.notes.find((note) => note.id === noteId)
            if (note) {
                note.style.backgroundColor = color
                noteService.save(note).then(() => {
                    showSuccessMsg('Note color updated successfully!')
                })
            }

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
        },
        copyNote(note) {

            const copiedNote = JSON.parse(JSON.stringify(note))
            copiedNote.id = ''
            noteService.save(copiedNote).then(() => {
                this.fetchNotes()
            })
        },
        updateNoteLabel(updatedNote) {
            noteService.save(updatedNote).then(() => {
                showSuccessMsg('Note label updated successfully!')
                this.fetchNotes()
            })
        },
        toggleDarkMode(isDarkMode) {
            this.isDarkMode = isDarkMode
          }
    },
}


