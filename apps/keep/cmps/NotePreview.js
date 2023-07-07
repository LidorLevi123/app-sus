import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"
import NoteAdd from "./NoteAdd.js"
import NoteVideo from "./NoteVideo.js"
import NoteMap from "./NoteMap.js"
import NoteDetails from "../pages/NoteDetails.js"

export default {
  name: 'preview',
  props: ['note'],
  template: `
  
    <div class="note-card" :style="{ backgroundColor: note.style.backgroundColor }" @click="$router.push('/note/details/' + note.id)">
      <component
        :is="getComponent(note.type)"
        :note="note"
        @deleteNote="deleteNote"
        @changeColor="changeColor"
        @startEditing="startEditing"
        @saveNote="saveNote"
        @showColorPicker="showColorPicker"
        @copyNote="copyNote"
      />
      
      <input type="color" class="color-input" ref="colorPicker" @change="changeColor(note.id, $event.target.value)" hidden />
      <button @click.stop @click="togglePinNote" class="pin-button">
      <span title="Pin Note" class="material-symbols-outlined" :class="{ 'pinned-icon': note.isPinned }">push_pin</span>
    </button>
    
    </div>

  `,
  
  components: {
    NoteTxt,
    NoteImg,
    NoteTodos,
    NoteAdd,
    NoteVideo,
    NoteMap,
    NoteDetails
  },
  data() {
    return {
      isEditing: false,
      editMode: '',
      editedNote: null,
      isModalOpen: false
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
    deleteNote() {
      this.$emit('deleteNote', this.note)
    },
    changeColor(id, color) {
      this.$emit('changeColor', id, color)
    },
    startEditing(mode) {
      this.editMode = mode
      this.editedNote = { ...this.note }
      this.isEditing = true
    },
    saveNote() {
      this.$emit('saveNote', this.editedNote)
      this.isEditing = false
    },
    showColorPicker(noteId) {
      const colorPicker = this.$refs.colorPicker
      colorPicker.click()
    },
    getComponent(type) {
      switch (type) {
        case 'NoteTxt':
          return NoteTxt
        case 'NoteImg':
          return NoteImg
        case 'NoteTodos':
          return NoteTodos
        case 'NoteVideo':
          return NoteVideo
        case 'NoteMap':
          return NoteMap
        default:
          return null
      }
    },
    togglePinNote() {
      this.$emit('togglePinNote', this.note)
    },
    copyNote() {

      this.$emit('copyNote', this.note)
    },
    
  }
}