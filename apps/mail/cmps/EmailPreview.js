import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'

export default {
    props: ['email'],
    template: `
        <article @click="onSelectEmail" class="email-preview" :class="emailClass">
            <span>{{ email.from }}</span>
            <span>{{ email.subject }}</span>
            <span>{{ emailDate }}</span>
        </article>
    `,

    computed: {
        emailDate() {
            const emailDate = new Date(this.email.sentAt)
            return utilService.getMonthName(emailDate).substring(0,3) + ' ' + utilService.padNum(emailDate.getDate())
        },
        emailClass() {
            return {
                read: this.email.isRead
            }
        }
    },

    created() {

    },

    methods: {
        onSelectEmail() {
            this.$router.push(`email/details/${this.email.id}`)
            if(!this.email.isRead) this.email.isRead = true
            emailService.save(this.email)
        }
    }
}