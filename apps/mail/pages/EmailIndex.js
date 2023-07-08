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
            if (!this.filterBy) return this.emails
            const regex = new RegExp(this.filterBy.subject, 'i')

            let emails = this.emails.filter(email => regex.test(email.subject))

            if(this.filterBy.type !== undefined || this.filterBy.category !== undefined) {
                emails = emails.filter(email =>
                    email.type.includes(this.filterBy.type) &&
                    email.category.includes(this.filterBy.category))
            }
            
            if (this.filterBy.isRead !== null) {
                return this.emails.filter(email => email.isRead === this.filterBy.isRead)
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
                // Delete Email Completly from array
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