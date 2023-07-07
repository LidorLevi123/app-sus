import { emailService } from "../../mail/services/email.service.js"

export default {
    template: `
     <form @submit.prevent="sendEmail" class="email-edit">
             <header class="title">
                <h4>New mail</h4>
                <span @click="closeWindow" class="material-symbols-outlined">close</span>
            </header>
            <input v-model="emailToEdit.to" type="text" placeholder="To">
            <input v-model="emailToEdit.subject" type="text" placeholder="Subject">
            <textarea v-model="emailToEdit.body" type="text"></textarea>
            <section class="actions">
                <button class="btn-send" :disabled="!isValid">Send</button>
                <span class="material-symbols-outlined">delete</span>
            </section>
        </form>
    `,

    data() {
        return {
            emailToEdit: emailService.getEmptyEmail(),
        }
    },

    computed: {
        isValid() {
            return this.emailToEdit.subject.length > 0 &&
                this.emailToEdit.to.length > 0
        }
    },

    created() {
        const { emailId } = this.$route.params

        if (!emailId) return
        emailService.get(emailId)
            .then(email => {
                this.emailToEdit = email
            })
            .catch(err => {
                showErrorMsg('Cannot load email for edit')
                this.$router.push('/email')
            })
    },

    methods: {
        sendEmail() {
            this.emailToEdit.type = 'sent'
            this.emailToEdit.sentAt = Date.now()
            
            emailService.save(this.emailToEdit)
                .then(savedEmail => {
                    // showSuccessMsg('email sent!')
                    this.$emit('closeWindow', savedEmail)
                })
                .catch(err => {
                    // showErrorMsg('Cannot save email')
                })
        },
        closeWindow() {
            this.$emit('closeWindow')
        }
    },

    name: 'EmailEdit'
}