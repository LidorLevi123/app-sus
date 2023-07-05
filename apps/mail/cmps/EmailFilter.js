export default {
    template: `
        <section class="email-filter">
            <input type="text" placeholder="Search Emails" v-model="filterBy.subject">
            <select name="" id="" v-model="filterBy.isRead">
                <option value="">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
        </section>
    `,
    data() {
        return {
            filterBy: {
                subject: '', 
                isRead: false
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