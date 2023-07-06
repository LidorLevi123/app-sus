import { noteService } from "../services/note.service.js"

export default {
  props: ['info'],
  template: `
  <div :style="{ backgroundColor: note.style.backgroundColor }">
  <div class="note-title" ref="titleElement" contenteditable spellcheck="false" @keyup="editTitle">
   {{ note.info.title }}

  </div>
    <img :src="note.info.url" alt="Image Note" class="note-img" />
    <div class="note-toolbar">
      <button @click="deleteNote" class="delete-button">
        <span class="material-symbols-outlined">delete</span>
      </button>
      <span class="color-span" :style="{ backgroundColor: note.style.backgroundColor }" @click="showColorPicker(note.id)">
        <span class="material-symbols-outlined">palette</span>
      </span>
      <input type="color" class="color-input" ref="colorPicker" @change="changeColor(note.id, $event.target.value)" hidden />
      <button @click="copyNote" class="copy-button">
    <span class="material-symbols-outlined">file_copy</span>
  </button>
    </div>
  </div>
    `,
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      editMode: '',
      editedNote: null,
    }
  },
  methods: {
    deleteNote() {
      this.$emit('deleteNote', this.note)
    },
    changeColor(id, color) {
      this.$emit('changeColor', id, color)
    },
    editTitle() {
      const newTitle = this.$refs.titleElement.innerText.trim()
      this.note.info.title = newTitle
      noteService.save(this.note)
    },
    showColorPicker(noteId) {
      const colorPicker = this.$refs.colorPicker
      colorPicker.click()
    },
    copyNote() {
      this.$emit('copyNote', this.note)

    },
  }
}
