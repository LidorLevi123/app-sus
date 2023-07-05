import EmailPreview from '../cmps/EmailPreview.js'

export default {
    props: ['emails'],

    template: `
        <section class="email-list">
            <header class="header-list">
                <span>From</span>
                <span>Subject</span>
                <span>At</span>
            </header>
            <ul class="clean-list">
                <li v-for="email in emails" :key="email.id">
                    <EmailPreview :email="email"/>
                </li>
            </ul>
        </section>
    `,

    methods: {

    },

    components: {
        EmailPreview
    },

    name: 'EmailList',
}