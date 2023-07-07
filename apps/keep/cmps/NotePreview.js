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
      <div class="label-options">
        <button title="Add Label" @click.stop class="label-selection-button" @click="toggleLabelMenu">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
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
      <div v-show="isLabelMenuOpen" class="label-menu">
        <button @click.stop v-for="label in labelOptions" :key="label.name" class="label-option" :style="{ backgroundColor: label.color }" @click="selectLabel(label)">
          {{ label.name }}
        </button>
      </div>
      <input type="color" class="color-input" ref="colorPicker" @change="changeColor(note.id, $event.target.value)" hidden />
      <button @click.stop @click="togglePinNote" class="pin-button">
        <span title="Pin Note" class="material-symbols-outlined" :class="{ 'pinned-icon': note.isPinned }">push_pin</span>
      </button>
      <div v-if="editedNote.label" class="label-display" :style="{ backgroundColor: editedNote.label.color }">
        {{ editedNote.label.name }}
      </div>
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
      editedNote: {
        ...this.note,
        label: null
      },
      isModalOpen: false,
      selectedLabel: '', // Store the selected label
      isLabelMenuOpen: false,
      labelOptions: [
        { name: 'Critical', color: '#FF0000' },
        { name: 'Family', color: '#00FF00' },
        { name: 'Work', color: '#0000FF' },
        { name: 'Friends', color: '#b3b306' },
        { name: 'Spam', color: '#FF00FF' },
        { name: 'Memories', color: '#00FFFF' },
        { name: 'Romantic', color: '#FFA500' }
      ]
    }
  },
  methods: {
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
    toggleLabelMenu() {
      this.isLabelMenuOpen = !this.isLabelMenuOpen
    },
    selectLabel(label) {
      this.selectedLabel = label
      this.editedNote.label = label
      this.isLabelMenuOpen = false
    },
  }
}