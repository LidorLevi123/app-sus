import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
    props: ['info'],
    template: `
<form class="add-note-form">
  <div class="input-wrapper">
    <div class="input-container">
      <input type="text" v-model="title" placeholder="Write your mind" class="add-note-input" />
      <button @click.prevent="addNote" class="add-note-button"><span class="material-symbols-outlined">save</span></button>

      <div class="button-group">
        <button @click.prevent="setNoteType('text')" class="note-type-button"><span class="material-symbols-outlined">article</span></button>
        <button @click.prevent="setNoteType('img')" class="note-type-button"><span class="material-symbols-outlined">image</span></button>
        <button @click.prevent="setNoteType('video')" class="note-type-button"><span class="material-symbols-outlined">smart_display</span></button>
        <button @click.prevent="setNoteType('todos')" class="note-type-button"><span class="material-symbols-outlined">format_list_bulleted_add</span></button>
        <button @click.prevent="createMapNote" class="note-type-button"><span class="material-symbols-outlined">place</span></button>
      </div>
    </div>
  </div>
  <textarea v-if="isTextNote" v-model="text" placeholder="Note" rows="4" class="add-note-textarea"></textarea>
  <input v-if="isImgNote" type="text" v-model="imgUrl" placeholder="Image URL" class="add-note-input" />
  <input v-if="isVideoNote" type="text" v-model="videoUrl" placeholder="YouTube Video URL" class="add-note-input" />
  <div v-if="isTodosNote" class="todos-input">
    <div v-for="(todo, index) in todos" :key="index">
      <input type="checkbox" v-model="todo.done" />
      <input type="text" v-model="todo.txt" class="todos-input-line" placeholder="Todo line" />
    </div>
    <button @click.prevent="addTodo" class="add-todo-button"><span class="material-symbols-outlined">add_circle</span></button>
  </div>
</form>
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
            this.noteType = ''
        },
        createMapNote() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude
                    const lng = position.coords.longitude

                    const mapNote = {
                        id: '',
                        type: 'NoteMap',
                        isPinned: false,
                        info: {
                            lat,
                            lng,
                            title: this.title,
                        },
                        style: {
                            backgroundColor: utilService.getRandomColor()
                        }
                    }

                    noteService.save(mapNote).then(() => {
                        this.$emit('addNote', mapNote)
                        this.resetFields()
                    })
                }, (error) => {
                    console.error('Error retrieving location:', error)
                })
            } else {
                console.error('Geolocation is not supported by this browser.')
            }
        },
    },
}