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
        <!-- Render the appropriate component based on the note type -->
        <component
          :is="getComponent(noteData.type)"
          :note="noteData"
          :style="{ backgroundColor: noteData.style.backgroundColor }"
        ></component>
        <!-- Other note details -->
        <div class="btns-details note-toolbar">
          <button @click="deleteNote" class="delete-button">
            <span class="material-symbols-outlined">delete</span>
          </button>
          <span class="color-span" :style="{ backgroundColor: noteData.style.backgroundColor }" @click="showColorPicker(noteData.id)">
            <span class="material-symbols-outlined">palette</span>
          </span>
          <input type="color" class="color-input" ref="colorPicker" @change="changeColor(noteData.id, $event.target.value)" hidden />
          <button @click="copyNote" class="copy-button">
            <span class="material-symbols-outlined">file_copy</span>
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
            noteData: null,
        };
    },
    created() {
        this.fetchNoteData()
    },
    methods: {
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
        deleteNote() {
            this.$emit('deleteNote', this.noteData)
        },
        changeColor(id, color) {
            this.$emit('changeColor', id, color)
        },
        showColorPicker(noteId) {
            const colorPicker = this.$refs.colorPicker
            colorPicker.click()
        },
        copyNote() {
            console.log(this.noteData)
            this.$emit('copyNote', this.noteData)
        },
    },
};