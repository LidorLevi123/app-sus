import { emailService } from '../services/email.service.js'

import EmailList from '../cmps/EmailList.js'
import EmailFilter from '../cmps/EmailFilter.js'
import EmailFolderList from '../cmps/EmailFolderList.js'

export default {

    template: `
        <section class="email-index main-layout">
            <button>🖊 Compose</button>
            <!-- <input type="text" placeholder="Main Filter Placeholder"> -->
            <EmailFilter @filter="setFilterBy"/>
            <EmailFolderList />
            <RouterView :emails="filteredEmails"/>
        </section>
    `,

    data() {
        return {
            emails: [],
            filterBy: null
        }
    },

    computed: {
        filteredEmails() {
            if (!this.filterBy) return this.emails
            const regex = new RegExp(this.filterBy.subject, 'i')
            const emails = this.emails.filter(email => regex.test(email.subject))

            if(this.filterBy.isRead === null) return emails
            if(this.filterBy.isRead) return emails.filter(email => email.isRead)
            if(!this.filterBy.isRead) return emails.filter(email => !email.isRead)
            
        }
    },

    created() {
        emailService.query()
            .then(emails => this.emails = emails)
    },

    methods: {
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },

    components: {
        EmailList,
        EmailFilter,
        EmailFolderList
    },

    name: 'EmailIndex'
}