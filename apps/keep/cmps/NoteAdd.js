import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
    props: ['info'],
    template: `
  <div>

    <form class="add-note-form">
      <input type="text" v-model="title" placeholder="Write your mind" class="add-note-input" />
      <textarea v-if="isTextNote" v-model="text" placeholder="Note" rows="4" class="add-note-textarea"></textarea>
      <input v-if="isImgNote" type="text" v-model="imgUrl" placeholder="Image URL" class="add-note-input" />
      <input v-if="isVideoNote" type="text" v-model="videoUrl" placeholder="YouTube Video URL" class="add-note-input" />
      <div v-if="isTodosNote" class="todos-input">
        <div v-for="(todo, index) in todos" :key="index">
          <input type="checkbox" v-model="todo.done" />
          <input type="text" v-model="todo.txt" class="todos-input-line" placeholder="Todo line" />
        </div>
        <button @click.prevent="addTodo" class="add-todo-button">Add Todo</button>
      </div>
      <div class="note-type-buttons">
        <button @click.prevent="setNoteType('text')" class="note-type-button">Text Note</button>
        <button @click.prevent="setNoteType('img')" class="note-type-button">Image Note</button>
        <button @click.prevent="setNoteType('video')" class="note-type-button">Video Note</button>
        <button @click.prevent="setNoteType('todos')" class="note-type-button">Todos Note</button>
      </div>
      <button @click.prevent="addNote" class="add-note-button">Save</button>
    </form>
  </div>
    `,
    props: ['info'],
    data() {
        return {
            title: '',
            text: '',
            imgUrl: '',
            videoUrl: '',
            todos: [],
            noteType: '',
        }
    },
    computed: {
        isTextNote() {
            return this.noteType === 'text'
        },
        isImgNote() {
            return this.noteType === 'img'
        },
        isVideoNote() {
            return this.noteType === 'video'
        },
        isTodosNote() {
            return this.noteType === 'todos'
        },
    },
    methods: {
        setNoteType(type) {
            this.noteType = type
        },
        addNote() {
            let note
            switch (this.noteType) {
                case 'text':
                    note = this.createTextNote()
                    break
                case 'img':
                    note = this.createImgNote()
                    break
                case 'video':
                    note = this.createVideoNote()
                    break
                case 'todos':
                    note = this.createTodosNote()
                    break
                default:
                    return
            }
            noteService.save(note).then(() => {
                this.$emit('addNote', note)
                this.resetFields()
            })
        },
        createTextNote() {
            return {
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
        },
        createImgNote() {
            return {
                id: '',
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: utilService.getRandomColor(),
                },
                info: {
                    url: this.imgUrl,
                    title: this.title,
                },
            }
        },
        createVideoNote() {
            return {
                id: '',
                type: 'NoteVideo',
                isPinned: false,
                style: {
                    backgroundColor: utilService.getRandomColor(),
                },
                info: {
                    url: this.videoUrl,
                    title: this.title,
                },
            }
        },
        createTodosNote() {
            return {
                id: '',
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: utilService.getRandomColor(),
                },
                info: {
                    title: this.title,
                    todos: this.todos,
                },
            }
        },
        addTodo() {
            this.todos.push({ txt: '', done: false })
        },
        resetFields() {
            this.title = ''
            this.text = ''
            this.imgUrl = ''
            this.videoUrl = ''
            this.todos = []
            this.noteType = 'text'
        },
    },
}