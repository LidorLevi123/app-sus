import { noteService } from '../services/note.service.js'


export default {
  template: `
  <div class="note-modal-overlay" @click="closeModal">
    <div class="note-modal-content">
      <div v-if="noteData">
        <h3>{{ noteData.info.title }}</h3>
        <p>{{ noteData.info.txt }}</p>
        <!-- Other note details -->
      </div>
    </div>
  </div>
    `,
  props: {
    noteId: {
      type: String,
      required: true,
    },
    notes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      noteData: null,
    }
  },
  mounted() {
    this.fetchNoteData()
  },
  methods: {
    fetchNoteData() {
      const noteId = this.$route.params.noteId
      noteService.get(noteId)
        .then((note) => {
          this.noteData = note
        })
        .catch((error) => {
          console.error('Error fetching note data:', error)
        })
    },
    closeModal() {
      this.$emit('close')
    },
  },
}