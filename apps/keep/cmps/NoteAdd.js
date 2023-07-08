import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
    props: ['info'],
    template: `
<form class="add-note-form">
  <div class="input-wrapper">
    <div class="input-container">
      <input type="text" v-model="title" placeholder="Write your mind" class="add-note-input" />
      <button title="Save Note" @click.prevent="addNote" class="add-note-button"><span class="material-symbols-outlined">save</span></button>

      <div class="button-group">
        <button title="Text Note" @click.prevent="setNoteType('text')" class="note-type-button"><span class="material-symbols-outlined">article</span></button>
        <button title="Image Note" @click.prevent="setNoteType('img')" class="note-type-button"><span class="material-symbols-outlined">image</span></button>
        <button title="Video Note" @click.prevent="setNoteType('video')" class="note-type-button"><span class="material-symbols-outlined">smart_display</span></button>
        <button title="Todo Note" @click.prevent="setNoteType('todos')" class="note-type-button"><span class="material-symbols-outlined">format_list_bulleted_add</span></button>
        <button title="Current Location Note" @click.prevent="createMapNote" class="note-type-button"><span class="material-symbols-outlined">place</span></button>
        <button title="Record Audio" @click.prevent="recordAudio" class="record-audio-button"><span class="material-symbols-outlined">mic</span></button>
        <!-- <button @click.prevent="addCanvasNote">Add Canvas Note</button> -->
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
    <button title="Add Another Todo" @click.prevent="addTodo" class="add-todo-button"><span class="material-symbols-outlined">add_circle</span></button>
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
            audioUrl: '',
        }
    },
    created() {
        const { title, text } = this.$route.query
        if (title && text) {
          this.title = title
          this.text = text
          this.setNoteType('text')
          this.$router.push('/note')
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
        isAudioNote() {
            return this.noteType === 'audio'
        },

    },
    methods: {
        recordAudio() {
            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia({ audio: true })
                    .then((stream) => {
                        const mediaRecorder = new MediaRecorder(stream)
                        const audioChunks = []

                        mediaRecorder.addEventListener("dataavailable", (event) => {
                            audioChunks.push(event.data)
                        })

                        mediaRecorder.addEventListener("stop", () => {
                            const audioBlob = new Blob(audioChunks)
                            const audioUrl = URL.createObjectURL(audioBlob)
                            this.audioUrl = audioUrl
                            console.log(audioUrl)

                            const note = this.createAudioNote()
                            this.$emit('addNote', note)
                            this.resetFields()
                        })

                        mediaRecorder.start()

                        setTimeout(() => {
                            mediaRecorder.stop()
                            console.log('stopped recording')
                        }, 3000)
                    })
                    .catch((error) => {
                        console.error("Error recording audio:", error)
                    })
            } else {
                console.error("getUserMedia not supported")
            }
        },

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
                case 'audio':
                    note = this.createAudioNote()
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
            console.log(this.imgUrl)
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
            this.audioUrl = ''
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
        createAudioNote() {
            return {
                id: '',
                type: 'NoteAudio',
                isPinned: false,
                style: {
                    backgroundColor: utilService.getRandomColor(),
                },
                info: {
                    title: this.title,
                    audioUrl: this.audioUrl,
                },
            }
        },


    },
}