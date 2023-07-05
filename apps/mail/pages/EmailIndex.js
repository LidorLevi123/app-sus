import { emailService } from '../services/email.service.js'

import EmailList from '../cmps/EmailList.js'

export default {

    template: `
        <section class="email-index main-layout">
            <EmailList :emails="emails"/>
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
        EmailList,
    },

    name: 'EmailIndex'
}