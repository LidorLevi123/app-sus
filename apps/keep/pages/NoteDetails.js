import { noteService } from '../services/note.service.js'
import NoteTxt from '../cmps/NoteTxt.js'
import NoteImg from '../cmps/NoteImg.js'
import NoteVideo from '../cmps/NoteVideo.js'
import NoteMap from '../cmps/NoteMap.js'

export default {
    name: 'Details',
    props: ['note'],
    template: `
<div class="overlay" @click="$router.push('/note')">
      <div class="note-details" v-if="noteData" :style="{ backgroundColor: noteData.style.backgroundColor }" @click.stop>

        <component
          :is="getComponent(noteData.type)"
          :note="noteData"
          :style="{ backgroundColor: noteData.style.backgroundColor }"

        ></component>

        <div class="btns-details note-toolbar">
          <button @click="deleteNote(noteData)" class="delete-button">
            <span @click="$router.push('/note')" class="material-symbols-outlined">delete</span>
          </button>
          <span class="color-span" :style="{ backgroundColor: noteData.style.backgroundColor }" @click="showColorPicker(noteData.id)">
            <span class="material-symbols-outlined">palette</span>
          </span>
          <input type="color" class="color-input" ref="colorPicker" @input="changeColor(noteData.id, $event.target.value)" hidden />
          <button @click="copyNote(noteData)" class="copy-button">
            <span @click="$router.push('/note')" class="material-symbols-outlined">file_copy</span>
          </button>
        </div>
        <button @click="$router.push('/note')" class="back-button">X</button>
      </div>
    </div>
  `,
    name: 'Details',
    props: ['note'],
    components: {
        NoteTxt,
        NoteImg,
        NoteVideo,
        NoteMap,
    },
    data() {
        return {
            notes: [],
            noteData: null,
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
        this.fetchNoteData()
    },
    methods: {
        fetchNotes() {
            noteService.query().then((notes) => {
                this.notes = notes.map((note) => ({
                    ...note,

                }))
            })
        },
        fetchNoteData() {
            const noteId = this.$route.params.noteId
            noteService
                .get(noteId)
                .then((note) => {
                    this.noteData = note
                    console.log(note)
                })
                .catch((error) => {
                    console.error('Error fetching note data:', error)
                })
        },
        getComponent() {
            switch (this.noteData.type) {
                case 'NoteTxt':
                    return NoteTxt
                case 'NoteImg':
                    return NoteImg
                case 'NoteVideo':
                    return NoteVideo
                case 'NoteMap':
                    return NoteMap
                default:
                    return null
            }
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



            this.noteData.style.backgroundColor = color
            noteService.save(this.noteData).then(() => {
                showSuccessMsg('Note color updated successfully!')
            })


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
        showColorPicker(noteId) {
            const colorPicker = this.$refs.colorPicker
            colorPicker.click()
        },
        changeColor(id, color) {
            this.changeNoteColor(id, color)
        },
        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.fetchNoteData(); // Reload the note data
            })
        },
    }
}