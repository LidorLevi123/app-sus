export default {
  template: `
  <section class="note-filter">
    <input type="text" placeholder="Search notes" v-model="filterBy.txt" @input="emitFilter" />
    <!-- Other filter options -->
  </section>
  `,
  data() {
    return {
      filterBy: {
        txt: '', // Add other filter properties as needed
      },
    };
  },
  methods: {
    emitFilter() {
      this.$emit('filter', this.filterBy);
    },
  },
};