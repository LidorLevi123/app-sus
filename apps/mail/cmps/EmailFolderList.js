export default {
    template: `
        <aside class="email-folder-list">
            <ul class="clean-list">
                <li @click="onSetFilterBy('type', '')">
                    <span class="material-symbols-outlined">stacked_email</span><h4>All</h4>
                </li>
                <li @click="onSetFilterBy('type', 'inbox')">
                    <span class="material-symbols-outlined">inbox</span><h4>Inbox</h4>
                </li>
                <li @click="onSetFilterBy('type', 'sent')">
                    <span class="material-symbols-outlined">send</span><h4>Sent</h4>
                </li>
                <li @click="onSetFilterBy('isRead', true)">
                    <span class="material-symbols-outlined">drafts</span><h4>Read</h4>
                </li>
                <li @click="onSetFilterBy('isRead', false)">
                    <span class="material-symbols-outlined">mail</span><h4>Unread</h4>
                </li>
                <li @click="onSetFilterBy('category', 'starred')">
                    <span class="material-symbols-outlined">star</span><h4>Starred</h4>
                </li>
                <li @click="onSetFilterBy('category', 'draft')">
                    <span class="material-symbols-outlined">draft</span><h4>Draft</h4>
                </li>
                <li @click="onSetFilterBy('category', 'trash')">
                    <span class="material-symbols-outlined">delete</span><h4>Trash</h4>
                </li>
            </ul>
        </aside>
    `,

    data() {
        return {
            filterBy: this.resetFilterBy()
        }
    },

    methods: {
        onSetFilterBy(key, value) {
            this.filterBy = this.resetFilterBy()
            this.filterBy[key] = value
            this.$emit('filter', this.filterBy)
            this.$router.push('/email')
        },
        resetFilterBy() {
            return { type: '', category: '', isRead: null }
        }
    },

    name: 'EmailFolderList',
}