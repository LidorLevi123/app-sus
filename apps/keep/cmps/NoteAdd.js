import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
    props: ['info'],
    template: `
  <div>
    <h2>Add Note</h2>
    <form class="add-note-form">
      <input type="text" v-model="title" placeholder="Title" class="add-note-input" />
      <textarea v-model="text" placeholder="Note" rows="4" class="add-note-textarea"></textarea>
      <button @click.prevent="addNote" class="add-note-button">Save</button>
    </form>
  </div>
    `,
    data() {
        return {
            title: '',
            text: '',
        };
    },
    methods: {
        addNote() {
            const note = {
                id: '',
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: utilService.getRandomColor(),
                },
                info: {
                    title: this.title,
                    txt: this.text,
                },
            }
            noteService.save(note).then(() => {
                this.$emit('addNote', note)
                this.title = ''
                this.text = ''
            })
        },
    }
}