import { emailService } from '../services/email.service.js'

import EmailList from '../cmps/EmailList.js'
import EmailFilter from '../cmps/EmailFilter.js'
import EmailFolderList from '../cmps/EmailFolderList.js'
import EmailEdit from '../cmps/EmailEdit.js'

export default {

    template: `
        <section class="email-index main-layout">
            <button @click="isComposeClicked = true"><span class="material-symbols-outlined">edit</span>Compose</button>
            <EmailFilter @filter="setFilterBy" @change-page="changePage" :pageInfo="pageInfo"/>
            <EmailFolderList @filter="setFilterBy" @mail-count="updatePageInfo" :emails="emails"/>
            <EmailEdit v-if="isComposeClicked" @closeWindow="toggleEmailAddWindow"/>
            <RouterView @reply='replyEmail' @delete="deleteEmail" :emails="filteredEmails"/>
            <span class="material-symbols-outlined" class="btn-plus" @click="isComposeClicked = !isComposeClicked">edit</span>
        </section>
    `,

    data() {
        return {
            emails: [],
            currPageIdx: 0,
            emailsPerPage: 14,
            filterBy: null,
            isComposeClicked: false,
            pageInfo: {}
        }
    },

    computed: {
        filteredEmails() {
            
            if (!this.filterBy || (!this.filterBy.type && !this.filterBy.category && this.filterBy.isRead === null)) {
                return this.emails
            }

            let emails = []

            if(this.filterBy.subject) {
                const regex = new RegExp(this.filterBy.subject, 'i')
                emails = this.emails.filter(email => regex.test(email.subject) || regex.test(email.body) || regex.test(email.from))
                return emails
            }

            if (this.filterBy.isRead !== undefined && this.filterBy.isRead !== null) {
                emails = this.emails.filter(email =>
                email.isRead === this.filterBy.isRead)

            } else if (this.filterBy.category) {
                emails = this.emails.filter(email => email.category === this.filterBy.category)
                
            } else if(this.filterBy.type) {
                emails = this.emails.filter(email => email.type === this.filterBy.type)
            }

            return emails
        },
    },

    created() {
        this.loadEmails()
    },

    methods: {
        setEmailPaging() {
            let startIdx = this.currPageIdx * this.emailsPerPage
            let endIdx = startIdx + this.emailsPerPage

            this.emails = this.emails.slice(startIdx, endIdx)
            this.pageInfo = {
                startIdx,
                endIdx,
            }
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
                .then(this.setEmailPaging)
        },
        deleteEmail(email) {
            if (email.category !== 'trash') {
                email.category = 'trash'
                emailService.save(email)
                return
            } else {
                const emailIdx = this.emails.findIndex(mail => mail.id === email.id)
                this.emails.splice(1, emailIdx)
            }
        },
        toggleEmailAddWindow(emailToEdit) {
            if (emailToEdit) {
                this.emails.unshift(emailToEdit)
            }
            this.isComposeClicked = !this.isComposeClicked
        },
        changePage(diff) {
            if (diff === -1 && this.currPageIdx === 0) return
            if (diff === 1 && this.currPageIdx === Math.ceil(this.emails.length / this.emailsPerPage)) return

            this.currPageIdx += diff
            this.loadEmails()
        },
        updatePageInfo(emailCountMap) {
            // console.log(emailCountMap)
        },
        replyEmail(emailId) {
            this.isComposeClicked = true
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