import NotePreview from './NotePreview.js'
export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <NotePreview :note="note"/>
                    <section class="actions">
                        <button @click="onRemoveNote(note.id)">x</button>
                    </section>
                </li>
            </ul>
        </section>
    `,
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
    },
    components: {
        NotePreview,
    },
}
