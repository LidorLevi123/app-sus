
export default {
    props: ['info'],
    template: `
  <div class="note-card">
  <h3 class="note-title" v-if="!isEditing" @click="startEditing('title')">
      {{ note.info.title }}
    </h3>
    <input
      v-if="isEditing && editMode === 'title'"
      type="text"
      class="edit-input"
      v-model="editedNote.info.title"
      @keyup.enter="saveNote"
      @blur="saveNote"
    />

    <div class="toolbar">
    <button @click="deleteNote" class="delete-button">
      <span class="material-symbols-outlined">delete</span>
    </button>
    <span class="color-span" :style="{ backgroundColor: note.style.backgroundColor }" @click="showColorPicker(note.id)">
      <span class="material-symbols-outlined">palette</span>
    </span>
    <input type="color" class="color-input" ref="colorPicker" @change="changeColor(note.id, $event.target.value)" hidden />
    </div>
  </div>

    <div class="video-embed">
      <iframe
        width="250"
        height="315"
        :src="getYouTubeEmbedUrl(note.info.url)"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
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
        startEditing(mode) {
            console.log(mode)
            this.editMode = mode
            this.editedNote = { ...this.note }
            console.log(this.editedNote)
            this.isEditing = true
        },
        saveNote() {
            noteService.save(this.editedNote)
            this.isEditing = false
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
    },
}