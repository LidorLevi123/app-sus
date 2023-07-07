import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'

export default {
    props: ['email'],
    template: `
        <article @mouseover="onMouseOver"
                 @mouseout="onMouseOut"
                 @click="onSelectEmail" 
                 class="email-preview" 
                 :class="emailClass">

            <span>
                <span class="material-symbols-outlined" v-if="!isEmailChecked" @click="onCheckEmail" title="Select">check_box_outline_blank</span> 
                <span class="material-symbols-outlined" v-if="isEmailChecked" @click="onCheckEmail" title="Unselect">select_check_box</span>
                <span class="material-symbols-outlined star" @click="onStarEmail" title="Mark as Favorite">star</span>
                {{ emailFromTo }}
            </span>

            <span>{{ email.subject }} - <span class="email-body">{{ email.body }}</span></span>

            <span v-show="!isHovered">{{ emailDate }}</span>

            <span v-show="isHovered" class="actions-right">
                <span @click="onDeleteEmail($event, email)" class="material-symbols-outlined delete" title="Delete">delete</span>
                <span @click="onMarkRead" v-show="isEmailRead" class="material-symbols-outlined" title="Mark as Unread">mail</span>
                <span @click="onMarkRead" v-show="!isEmailRead" class="material-symbols-outlined" title="Mark as Read">drafts</span>
            </span>
        </article>
    `,

    data() {
        return {
            isHovered: false
        }
    },

    computed: {
        emailDate() {
            const emailDate = new Date(this.email.sentAt)

            if(this.isTodayPassed(emailDate)) {
                const month = utilService.getMonthName(emailDate).substring(0, 3)
                const day = utilService.padNum(emailDate.getDate())
                return month + ' ' + day
            }

            const hour = emailDate.getHours() < 10 ? '0' + emailDate.getHours() : emailDate.getHours()
            const minute = emailDate.getMinutes() < 10 ? '0' + emailDate.getMinutes() : emailDate.getMinutes()
            
            return hour + ':' + minute
        },
        emailClass() {
            return {
                read: this.email.isRead,
                checked: this.email.isChecked,
                starred: this.email.category === 'starred'
            }
        },
        emailFromTo() {
            if (this.email.type === 'sent') return 'To: ' + this.email.to
            return this.email.from
        },
        isEmailChecked() {
            return this.email.isChecked
        },
        isEmailRead() {
            return this.email.isRead
        },
    },

    created() {

    },

    methods: {
        onSelectEmail() {
            this.$router.push(`email/details/${this.email.id}`)
            if (!this.email.isRead) this.email.isRead = true
            emailService.save(this.email)
        },
        onCheckEmail(ev) {
            ev.stopPropagation()
            this.email.isChecked = !this.email.isChecked
        },
        onStarEmail(ev) {
            ev.stopPropagation()
            this.email.category = this.email.category !== 'starred' ? 'starred' : ''
            emailService.save(this.email)
        },
        onMarkRead(ev) {
            ev.stopPropagation()
            this.email.isRead = !this.email.isRead
        },
        onDeleteEmail(ev, email) {
            ev.stopPropagation()
            this.$emit('delete', email)
        },
        onMouseOver() {
            this.isHovered = true
        },
        onMouseOut() {
            this.isHovered = false
        },
        isTodayPassed(date) {
            const currTime = Date.now()
            const givenTime = date.getTime()
            const day = 24 * 60 * 60 * 1000
            const diff = Math.floor((currTime - givenTime) / day)

            return diff
        },
    },

    name: 'EmailPreview'
}