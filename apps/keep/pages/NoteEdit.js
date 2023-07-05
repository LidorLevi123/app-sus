import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
  template: `
  <div class="note-edit">
    <textarea v-model="editedNote.info.txt" rows="4" cols="30"></textarea>
    <div class="note-actions">
      <button @click="saveNote" class="save-button">Save</button>
      <button @click="cancelEdit" class="cancel-button">Cancel</button>
    </div>
  </div>
    `,
  props: {
    note: Object,
  },
  data() {
    return {
      editedNote: null,
    }
  },
  mounted() {
    this.editedNote = { ...this.note }
  },
  methods: {
    saveNote() {
      this.$emit('updateNote', this.editedNote)
    },
    cancelEdit() {
      this.$emit('cancelEdit')
    },
  },
}

