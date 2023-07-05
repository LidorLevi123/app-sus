import { emailService } from '../services/email.service.js'

export default {

    template: `
        <section class="email-index main-layout">
            <h1>asdasdasd</h1>
        </section>
    `,

    data() {
        return {
            emails: [],
        }
    },

    computed: {

    },

    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
                console.log(this.emails)
            })
    },

    methods: {

    },

    components: {
        
    }
}