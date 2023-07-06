export default {
    template: `
  <div class="note-modal-overlay" @click="closeModal">
    <div class="note-modal-content">
      <h3>{{ note.title }}</h3>
      <p>{{ note.text }}</p>
    </div>
  </div>
    `,
    props: ['note'],
    methods: {
        closeModal() {
            this.$emit('closeModal')
        }
    }
}