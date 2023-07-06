import { noteService } from "../services/note.service.js"

export default {
  props: ['info'],
  template: `
<div >

  <div class="note-title" ref="titleElement" contenteditable spellcheck="false" @keyup="editTitle">
   {{ note.info.title }}

  </div>

  <div class="note-text" ref="txtElement" contenteditable spellcheck="false" @keyup="editTxt">

    {{ note.info.txt }}

    </div>

  <div class="note-toolbar note-toolbar-bottom" >
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

    showColorPicker(noteId) {
      const colorPicker = this.$refs.colorPicker
      colorPicker.click()
    },
    editTitle() {
      const newTitle = this.$refs.titleElement.innerText.trim()
      this.note.info.title = newTitle
      noteService.save(this.note)
    },
    editTxt() {
      const newTxt = this.$refs.txtElement.innerText.trim()
      this.note.info.txt = newTxt
      noteService.save(this.note)
    },
    copyNote() {
      this.$emit('copyNote', this.note)

    },
    showToolbar() {
      this.showButtons = true
    },
    hideToolbar() {
      this.showButtons = false
    },

  },
}