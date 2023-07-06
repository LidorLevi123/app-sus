export default {
    template: `
        <aside class="email-folder-list">
            <ul class="clean-list">
                <li @click="filterBy.category = 'inbox'">
                    <span class="material-symbols-outlined">inbox</span><h4>Inbox</h4>
                </li>
                <li @click="filterBy.category = 'starred'">
                    <span class="material-symbols-outlined">star</span><h4>Starred</h4>
                </li>
                <li @click="filterBy.category = 'sent'">
                    <span class="material-symbols-outlined">send</span><h4>Sent</h4>
                </li>
                <li @click="filterBy.category = 'draft'">
                    <span class="material-symbols-outlined">draft</span><h4>Draft</h4>
                </li>
                <li @click="filterBy.category = 'trash'">
                    <span class="material-symbols-outlined">delete</span><h4>Trash</h4>
                </li>
            </ul>
        </aside>
    `,

    data() {
        return {
            filterBy: { category: '' }
        }
    },

    watch: {
        filterBy: {
            handler() {
                this.$emit('filter', this.filterBy)
                this.$router.push('/email')
            },
            deep: true
        }
    },

    name: 'EmailFolderList',

}