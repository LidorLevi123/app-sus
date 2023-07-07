export default {
    template: `
        <section class="email-filter">
            <input type="text" placeholder="Search Emails" v-model="filterBy.subject">
        </section>
    `,

    data() {
        return {
            filterBy: {
                subject: '', 
            }
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