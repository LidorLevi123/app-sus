export default {
    props: ['info'],
    template: `
      <div>
        <div class="note-title" ref="titleElement" contenteditable spellcheck="false" @keyup="editTitle">
          {{ note.info.title }}
        </div>
  
        <audio class="audio" :src="note.info.audioUrl" controls :style="{ width: audioWidth, height: audioHeight }"></audio>  
        <div class="note-toolbar">
          <button title="Delete" @click.stop @click="deleteNote" class="delete-button">
            <span class="material-symbols-outlined">delete</span>
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
          audioWidth: '235px',
          audioHeight: '30px',
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