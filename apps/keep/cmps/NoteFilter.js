export default {
  template: `
<section class="note-filter">
  <div class="input-container">
    <input class="search-filter" type="text" placeholder="Search" v-model="filterBy.txt" @input="emitFilter" />
    <div class="select-container">
      <select class="select-filter" v-model="filterBy.type" @change="emitFilter">
        <option value="">All Notes</option>
        <option value="NoteTxt">Text Note</option>
        <option value="NoteImg">Image Note</option>
        <option value="NoteTodos">Todo Note</option>
        <option value="NoteVideo">Video Note</option>
        <option value="NoteMap">Map Note</option>
      </select>
    </div>
  </div>
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