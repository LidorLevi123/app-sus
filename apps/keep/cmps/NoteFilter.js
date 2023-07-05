export default {
    template: `
          <section class="note-filter">
              <input 
                  v-model="filterBy.txt" 
                  @input="onSetFilterBy"
                  type="text" 
                  placeholder="Search By Title">
              <input 
                  v-model="filterBy.price" 
                  @input="onSetFilterBy"
                  type="number" 
                  placeholder="Search By Max Price">
          </section>
      `,
    data() {
      return {
        filterBy: {
          txt: '',
          price: null,
        },
      }
    },
    methods: {
      onSetFilterBy() {
        this.$emit('filter', this.filterBy)
      },
    },
  }
  