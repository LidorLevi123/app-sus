import { emailService } from '../services/email.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <section class="email-details main-layout" v-if="email">

            <section class="actions">
                <span @click="this.$router.push('/email')" class="material-symbols-outlined" title="Back">arrow_back</span>
                <span class="material-symbols-outlined group" @click="showMsg('Mail reported as spam')" title="Report spam">report</span>
                <span class="material-symbols-outlined" @click="showMsg('Mail moved to trash')" title="Delete">delete</span>
                <span class="material-symbols-outlined" title="Mark as Unread">mail</span>
                <span class="material-symbols-outlined group" title="Schedule">schedule</span>
                <span class="material-symbols-outlined" title="Add to Notes" @click="addNoteToNotes">note_add</span>
                <span class="material-symbols-outlined" title="Set Category">drive_file_move</span>
                <span class="material-symbols-outlined group" title="Labels">label</span>
                <span class="material-symbols-outlined group2" title="Previous mail" @click="goTo('prevEmailId')">chevron_left</span>
                <span class="material-symbols-outlined" title="Next mail" @click="goTo('nextEmailId')">chevron_right</span>
            </section>

            <h1 class="subject">{{ email.subject }}</h1>

            <div class="sender-details">
                <div>
                    <img :src="imgUrl" alt="">
                    <h2>{{ email.from }} </h2>
                    <small>&lt{{ emailSender }}&gt</small>
                </div>
                <div>
                    <span>{{ emailDate }}</span>
                    <span class="material-symbols-outlined star" title="Mark as Favorite" @click="onStarEmail">star</span>
                    <span class="material-symbols-outlined" title="Reply" @click="onReply">reply</span>
                </div>
            </div>

            <p>{{ email.body }}</p>
        </section>
    `,

    data() {
        return {
            email: null,
            imgUrl: ''
        }
    },

    computed: {
        emailId() {
            return this.$route.params.emailId
        },
        emailSender() {
            return this.email.from.toLowerCase() + '@gmail.com'
        },
        emailDate() {
            return new Date(this.email.sentAt)
        }
    },

    created() {
        this.loadEmail()
    },

    methods: {
        loadEmail() {
            const { emailId } = this.$route.params
            if (!emailId) return

            emailService
                .get(emailId)
                .then(email => {
                    this.email = email
                    this.imgUrl = `https://robohash.org/${this.email.subject}?set=set5`
                })
                .catch(err => {
                    alert('Cannot load email')
                    this.$router.push('/email')
                })
        },
        onStarEmail() {
            this.email.category = this.email.category !== 'starred' ? 'starred' : ''
            showMsg('Mail marked as favorite')
            emailService.save(this.email)
        },
        onReply() {
            this.$emit('reply', this.$route.params.emailId)
        },
        goTo(emailId) {
            this.$router.push('/email/details/' + this.email[emailId])
        },
        addNoteToNotes() {
            const noteTitle = this.email.subject
            const noteText = this.email.body
            const queryParams = {
                title: noteTitle,
                text: noteText
            }
            this.$router.push({ path: '/note/add', query: queryParams })
        },
        showMsg(msg) {
            showSuccessMsg(msg)
        },
    },

    watch: {
        emailId() {
            this.loadEmail()
        },
    },
}