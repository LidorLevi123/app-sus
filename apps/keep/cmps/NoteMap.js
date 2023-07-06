export default {
    props: ['notes'],
    template: `
<div class="note-title" ref="titleElement" contenteditable spellcheck="false" @keyup="editTitle">
   {{ note.info.title }}

  </div>
    <div class="note-content">
      <!-- Display the map here -->
      <div class="map-container">
        <div class="map" ref="map"></div>
      </div>
    </div>
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
    `,
    emits: ['deleteNote', 'changeColor', 'startEditing', 'saveNote', 'showColorPicker', 'copyNote'],
    props: ['note'],
    mounted() {
        this.initMap()
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
        initMap() {
            const mapOptions = {
                center: { lat: this.note.info.lat, lng: this.note.info.lng },
                zoom: 12,
            }
            const map = new google.maps.Map(this.$refs.map, mapOptions)
            new google.maps.Marker({
                position: { lat: this.note.info.lat, lng: this.note.info.lng },
                map,
            })
        },
        copyNote() {
          this.$emit('copyNote', this.note)
    
        },
        editTitle() {
          const newTitle = this.$refs.titleElement.innerText.trim()
          this.note.info.title = newTitle
          noteService.save(this.note)
        },
    },
}