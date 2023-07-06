export default {
  template: `
  <section class="note-filter">
    <h2>Filters:</h2>
    <input class="search-filter" type="text" placeholder="Search notes" v-model="filterBy.txt" @input="emitFilter" />
    <select class="select-filter" v-model="filterBy.type" @change="emitFilter">
      <option value="">All Note Types</option>
      <option value="NoteTxt">Text Note</option>
      <option value="NoteImg">Image Note</option>
      <option value="NoteTodos">Todo Note</option>
      <option value="NoteVideo">Video Note</option>
    </select>
  </section>
  `,
  data() {
    return {
      filterBy: {
        txt: '',
        type: '', // Filter by note type
      },
    }
  },
  methods: {
    emitFilter() {
      this.$emit('filter', this.filterBy)
    },
  },
}