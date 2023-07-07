export default {
    template: `
        <section class="email-filter">
            <input type="text" placeholder="Search Emails" v-model="filterBy.subject">
            <div class="flex align-center">
                <span class="material-symbols-outlined group2" title="Previous Page" @click="onChangePage(-1)">chevron_left</span>
                <span class="material-symbols-outlined" title="Next Page" @click="onChangePage(1)">chevron_right</span>
            </div>
        </section>
    `,

    data() {
        return {
            filterBy: {
                subject: '',
            }
        }
    },

    methods: {
        onChangePage(idx) {
            this.$emit('change-page', idx)
        }
    },

    watch: {
        filterBy: {
            handler() {
                this.$emit('filter', this.filterBy)
            },
            deep: true
        }
    }
}