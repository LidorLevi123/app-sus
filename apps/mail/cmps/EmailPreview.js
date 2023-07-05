import { utilService } from '../../../services/util.service.js'

export default {
    props: ['email'],
    template: `
        <article class="email-preview" :class="emailClass">
            <span>{{ email.from }}</span>
            <span>{{ email.subject }}</span>
            <span>{{ emailDate }}</span>
        </article>
    `,

    computed: {
        emailDate() {
            const emailDate = new Date(this.email.sentAt)
            return utilService.getMonthName(emailDate) + ' ' + emailDate.getDate()
        },
        emailClass() {
            return {
                read: this.email.isRead
            }
        }
    },

    created() {
    },
}