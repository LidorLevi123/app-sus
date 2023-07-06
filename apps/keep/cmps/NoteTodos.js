export default {
  props: ['info'],
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
  <ul v-if="!isEditing" class="note-todos-list">
    <li v-for="(todo, index) in note.info.todos" :key="index">
      <label :class="{ 'done-todo': todo.doneAt }" @click="toggleTodoDone(index, todo)">
        <span class="todo-txt">{{ todo.txt }}</span>
      </label>
    </li>
  </ul>
  <div class="note-toolbar">
    <button @click="deleteNote" class="delete-button">
      <span class="material-symbols-outlined">delete</span>
    </button>
    <span class="color-span" :style="{ backgroundColor: note.style.backgroundColor }" @click="showColorPicker(note.id)">
      <span class="material-symbols-outlined">palette</span>
    </span>
    <input type="color" class="color-input" ref="colorPicker" @change="changeColor(note.id, $event.target.value)" hidden />
  </div>
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
    showColorPicker(noteId) {
      const colorPicker = this.$refs.colorPicker
      colorPicker.click()
    },
    startEditing(mode) {
      this.isEditing = true
      this.editMode = mode
      this.editedNote = { ...this.note }
    },
    cancelEditing() {
      this.isEditing = false
      this.editMode = ''
      this.editedNote = null
    },
    toggleTodoDone(index, value) {
      const todo = value
      todo.doneAt = !todo.doneAt ? new Date().toISOString() : null
      noteService.save(this.note)
        .then(() => {
          this.$emit('updateNote', this.note)
        })
        .catch((error) => {
          console.error('Failed to save the note:', error)
        })
    }
  }
}