export default {
    props: ['emails'],

    template: `
        <section class="email-list">
            <ul class="clean-list">
                <li v-for="email in emails">
                    {{ email.subject }}
                </li>
            </ul>
        </section>
    `,

    methods: {

    },

    components: {
        
    },

    name: 'EmailList',
}