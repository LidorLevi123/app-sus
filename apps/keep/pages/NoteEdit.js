import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
  template: `
        <form @submit.prevent="save" class="note-edit">
            <h2>{{(noteToEdit.id)? 'Edit' : 'Add'}} a Note</h2>
            <input v-model="noteToEdit.title" type="text" placeholder="Enter title">
            <input v-model.number="noteToEdit.price" type="number" >
            <hr />
            <RouterLink to="/note">Cancel</RouterLink> 
            <button :disabled="!isValid">save</button>
        </form>
    `,
  data() {
    return {
      noteToEdit: noteService.getEmptyNote(),
    }
  },
  computed: {
    isValid() {
      return this.noteToEdit.title.length > 0
    },
  },
  created() {
    const { noteId } = this.$route.params
    if (!noteId) return
    noteService
      .get(noteId)
      .then((note) => {
        this.noteToEdit = note
      })
      .catch((err) => {
        showErrorMsg('Cannot load note for edit')
        this.$router.push('/note')
      })
  },

  methods: {
    save() {
      noteService
        .save(this.noteToEdit)
        .then((savedNote) => {
          console.log('Saved Note', savedNote)
          showSuccessMsg('Note saved')
          this.$router.push('/note')
        })
        .catch((err) => {
          showErrorMsg('Cannot save note')
        })
    },
  },
}
