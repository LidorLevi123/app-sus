import { emailService } from '../services/email.service.js'

import EmailList from '../cmps/EmailList.js'
import EmailFilter from '../cmps/EmailFilter.js'
import EmailFolderList from '../cmps/EmailFolderList.js'
import EmailEdit from '../cmps/EmailEdit.js'

export default {

    template: `
        <section class="email-index main-layout">
            <button @click="isComposeClicked = true">🖊 Compose</button>
            <!-- <input type="text" placeholder="Main Filter Placeholder"> -->
            <EmailFilter @filter="setFilterBy"/>
            <EmailFolderList @filter="setFilterBy"/>
            <EmailEdit v-if="isComposeClicked" @closeWindow="toggleEmailAddWindow"/>
            <RouterView @delete="deleteEmail" :emails="filteredEmails"/>
        </section>
    `,

    data() {
        return {
            emails: [],
            filterBy: null,
            isComposeClicked: false,
        }
    },

    computed: {
        filteredEmails() {
            if (!this.filterBy) return this.emails
            const regex = new RegExp(this.filterBy.subject, 'i')
            const emails = this.emails.filter(email => regex.test(email.subject))

            if(this.filterBy.isRead === null || this.filterBy.isRead === undefined){
                if(this.filterBy.category) return emails.filter(email => email.category === this.filterBy.category)
                return emails
            } 
            return emails.filter(email => email.isRead === this.filterBy.isRead)
        }
    },

    created() {
        this.loadEmails()
    },

    methods: {
        loadEmails() {
            emailService.query()
            .then(emails => this.emails = emails)
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        deleteEmail(email) {
            if(email.category !== 'trash') {
                email.category = 'trash'
                emailService.save(email)
                return
            }
        },
        toggleEmailAddWindow(emailToEdit) {
            if(emailToEdit) this.emails.unshift(emailToEdit)
            this.isComposeClicked = !this.isComposeClicked
        }
    },

    components: {
        EmailList,
        EmailFilter,
        EmailFolderList,
        EmailEdit
    },

    name: 'EmailIndex'
}