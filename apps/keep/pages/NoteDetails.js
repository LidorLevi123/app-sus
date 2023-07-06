import { noteService } from '../services/note.service.js'


export default {
    name: 'Details',
    props: ['note'],
    template: `
    <div v-if="noteData">
      <h3>{{ noteData.info.title }}</h3>
      <p>{{ noteData.info.txt }}</p>
      <!-- Other note details -->
    </div>
  `,
  data() {
    return {
      noteData: null, // Initialize noteData as null
    };
  },
  created() {
    this.fetchNoteData()
  },
  methods: {
    fetchNoteData() {
      const noteId = this.$route.params.noteId
      noteService.get(noteId)
        .then((note) => {
          this.noteData = note
          console.log(note)
        })
        .catch((error) => {
          console.error('Error fetching note data:', error)
        })
    },
  },
  // Rest of the component code
}