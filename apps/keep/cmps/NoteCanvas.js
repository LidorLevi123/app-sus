export default {
    props: ['info'],
      template: `
  <div class="note-canvas">
    <div class="canvas-container">
      <canvas ref="canvas"></canvas>
    </div>
    <button @click="saveCanvasNote">Save</button>
  </div>
      `,
      emits: ['deleteNote', 'changeColor', 'startEditing', 'saveNote', 'showColorPicker', 'copyNote'],
      props: {
        note: {
          type: Object,
          required: true,
        },
      },
      mounted() {
        this.initializeCanvas()
          
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
          initializeCanvas() {
            const canvas = this.$refs.canvas;
            // Set up canvas properties and event listeners
            // For example: canvas.width, canvas.height, canvas.getContext(), etc.
          },
          saveCanvasNote() {
            const canvasDataUrl = this.$refs.canvas.toDataURL(); // Get the canvas image data as a data URL
            const note = {
              id: 'n200',
              type: 'NoteCanvas',
              isPinned: false,
              info: {
                image: canvasDataUrl,
              },
              style: {
                backgroundColor: '#FFFFFF',
              },
            };
            this.$emit('addNote', note);
          },
      },
  }