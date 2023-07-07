
export default {
  props: ['info'],
  template: `
<div>
<div class="note-title" ref="titleElement" contenteditable spellcheck="false" @keyup="editTitle">
   {{ note.info.title }}

  </div>
  <div class="video-embed">
      <iframe

        :src="getYouTubeEmbedUrl(note.info.url)"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="note-toolbar">
      <button @click.stop @click="deleteNote" class="delete-button">
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
    getYouTubeEmbedUrl(url) {
      const videoId = this.getYouTubeVideoId(url)
      return `https://www.youtube.com/embed/${videoId}`
    },
    getYouTubeVideoId(url) {
      const regex = /[?&]v=([^&#]+)/
      const match = url.match(regex)
      return match && match[1] ? match[1] : ''
    },
    copyNote() {
      this.$emit('copyNote', this.note)

    },
  },
}