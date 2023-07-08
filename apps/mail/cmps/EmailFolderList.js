import { emailService } from "../services/email.service.js"

export default {
    props: ['emails'],

    template: `
        <aside class="email-folder-list">
            <ul class="clean-list">
                <li @click="onSetFilterBy('type', '')" :class="activeClass('type', '')">
                    <span class="material-symbols-outlined">stacked_email</span><h4>All</h4>
                    <span class="email-count">{{ emailCountMap.total }}</span>
                </li>
                <li @click="onSetFilterBy('type', 'inbox')" :class="activeClass('type', 'inbox')">
                    <span class="material-symbols-outlined">inbox</span><h4>Inbox</h4>
                    <span class="email-count">{{ emailCountMap.inbox }}</span>
                </li>
                <li @click="onSetFilterBy('type', 'sent')" :class="activeClass('type', 'sent')">
                    <span class="material-symbols-outlined">send</span><h4>Sent</h4>
                    <span class="email-count">{{ emailCountMap.sent }}</span>
                </li>
                <li @click="onSetFilterBy('isRead', true)" :class="activeClass('isRead', true)">
                    <span class="material-symbols-outlined">drafts</span><h4>Read</h4>
                    <span class="email-count">{{ emailCountMap.read }}</span>
                </li>
                <li @click="onSetFilterBy('isRead', false)" :class="activeClass('isRead', false)">
                    <span class="material-symbols-outlined">mail</span><h4>Unread</h4>
                    <span class="email-count">{{ emailCountMap.unread }}</span>
                </li>
                <li @click="onSetFilterBy('category', 'starred')" :class="activeClass('category', 'starred')">
                    <span class="material-symbols-outlined">star</span><h4>Starred</h4>
                    <span class="email-count">{{ emailCountMap.starred }}</span>
                </li>
                <li @click="onSetFilterBy('category', 'draft')" :class="activeClass('category', 'draft')">
                    <span class="material-symbols-outlined">draft</span><h4>Draft</h4>
                    <span class="email-count">{{ emailCountMap.draft }}</span>
                </li>
                <li @click="onSetFilterBy('category', 'trash')" :class="activeClass('category', 'trash')">
                    <span class="material-symbols-outlined">delete</span><h4>Trash</h4>
                    <span class="email-count">{{ emailCountMap.trash }}</span>
                </li>
            </ul>
        </aside>
    `,

    data() {
        return {
            filterBy: {},
            emailCountMap: {},
        }
    },

    created() {
        this.loadCountMap()
        this.resetFilterBy()
    },

    methods: {
        onSetFilterBy(key, value) {
            this.resetFilterBy()
            this.filterBy[key] = value
            this.$emit('filter', this.filterBy)
            this.$router.push('/email')
            console.log(this.filterBy);
        },
        resetFilterBy() {
            this.filterBy = { type: '/', category: '', isRead: null }
        },
        loadCountMap() {
            emailService.getEmailCountMap()
                    .then(emailCountMap => this.emailCountMap = emailCountMap)
        },
        activeClass(key, value) {
            return {
                active: this.filterBy[key] === value
            }
        }
    },

    watch: {
        emails: {
            handler() {
                this.loadCountMap()
            },
            deep: true,
        },
    },

    name: 'EmailFolderList',
}