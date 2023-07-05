
export default {
    props: ['note'],
    template: `
  <div class="note-card" :style="{ backgroundColor: note.style.backgroundColor }">
    <h3 class="note-title" v-if="!isEditing" @click="startEditing('title')">
      {{ note.info.title }}
    </h3>
    <input
      v-if="isEditing && editMode === 'title'"
      type="text"
      class="edit-input"
      v-model="editedNote.info.title"
      @keyup.enter="saveNote"
      @blur="saveNote"
    />
    <p v-if="note.type === 'NoteTxt' && !isEditing" class="note-text" @click="startEditing('text')">
      {{ note.info.txt }}
    </p>
    <textarea
      v-if="isEditing && editMode === 'text'"
      class="edit-input"
      v-model="editedNote.info.txt"
      @keyup.enter="saveNote"
      @blur="saveNote"
    ></textarea>
    <button @click="deleteNote" class="delete-button">
      <span class="material-symbols-outlined">delete</span>
    </button>
    <span class="color-span" :style="{ backgroundColor: note.style.backgroundColor }" @click="showColorPicker(note.id)">
    <span class="material-symbols-outlined">palette</span>
    </span>
    <input type="color" class="color-input" ref="colorPicker" @change="changeColor(note.id, $event.target.value)" hidden />
  </div>
    `,

    props: {
        note: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isEditing: false,
            editMode: '',
            editedNote: null,
        }
    },
    methods: {
        deleteNote() {
            this.$emit('deleteNote', this.note)
        },
        changeColor(id, color) {
            this.$emit('changeColor', id, color)
        },

        editNote() {
            console.log(this.note)
            this.$emit('editNote', this.note)
        },
        showColorPicker(noteId) {
            const colorPicker = this.$refs.colorPicker
            colorPicker.click()
        },

        startEditing(mode) {
            this.editMode = mode;
            this.editedNote = { ...this.note }
            this.isEditing = true;
        },
        saveNote() {
            noteService.save(this.editedNote).then(() => {
                console.log('Note saved successfully')
                this.isEditing = false
            })
        },
    },
}