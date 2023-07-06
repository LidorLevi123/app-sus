import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'

export default {
    props: ['email'],
    template: `
        <article @click="onSelectEmail" class="email-preview" :class="emailClass">
            <span>
                <span class="material-symbols-outlined" v-if="!email.isSelected">check_box_outline_blank</span> 
                <span class="material-symbols-outlined" v-if="email.isSelected">select_check_box</span>
                <span class="material-symbols-outlined star">star</span>
                {{ emailFromTo }}
            </span>
            <span>{{ email.subject }} - <span class="email-body">{{ email.body }}</span></span>
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
        },
        emailFromTo() {
            if(this.email.category === 'sent') return 'To: ' + this.email.to
            return this.email.from
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