export default {
    props: ['pageInfo'],
    
    template: `
        <section class="email-filter">
        <span class="material-symbols-outlined filter-menu" @click="onOpenMenu">menu</span>
            <input type="text" placeholder="Search Emails" v-model="filterBy.subject">
            <div class="flex align-center">
                <span class="material-symbols-outlined" title="Previous Page" @click="onChangePage(-1)">chevron_left</span>
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
        },
        onOpenMenu() {
            document.body.classList.add('menu-open')
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