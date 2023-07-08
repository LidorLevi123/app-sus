export default {
    template: `
    <section class="book-filter">
        <input
            v-model="filterBy.txt"
            @input="onSetFilterBy"
            type="text"
            placeholder="Search books">
    </section>
    `,

    data() {
        return {
            filterBy: {
                txt: ''
            }
        }
    },

    methods: {
        onSetFilterBy() {
            this.$emit('filter', this.filterBy)
        }
    }
}