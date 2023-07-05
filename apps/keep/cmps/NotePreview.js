export default {
    props: ['note'],
    template: `
    <div class="note-card" :style="{ backgroundColor: note.style.backgroundColor }">
        <h3 class="note-title">{{ note.info.title }}</h3>
      <p v-if="note.type === 'NoteTxt'" class="note-text">{{ note.info.txt }}</p>
      <p v-else-if="note.type === 'NoteImg'" class="note-text">{{ note.info.title }}</p>
      <p v-else-if="note.type === 'NoteTodos'" class="note-text">{{ note.info.title }}</p>
      <button @click="deleteNote" class="delete-button">Delete</button>
      <input type="color" class="color-input" @change="changeColor" />

  </div>
    `,
    props: {
        note: {
            type: Object,
            required: true,
        },
    },
    methods: {
        deleteNote() {
            this.$emit('deleteNote', this.note)
        },
        changeColor() {
            this.$emit('changeColor', this.note.id, this.note.style.backgroundColor)
          },


    },

}
