import { emailService } from '../services/email.service.js'

import EmailList from '../cmps/EmailList.js'

export default {

    template: `
        <section class="email-index main-layout">
            <button>Compose</button>
            <input type="text" placeholder="Main Filter Placeholder">
            <aside>
                <a href="">Inbox</a> <br>
                <a href="">Starred</a> <br>
                <a href="">Sent</a> <br>
                <a href="">Draft</a> <br>
                <a href="">Trash</a>
            </aside>
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