import { emailService } from '../services/email.service.js'

export default {
    template: `
        <section class="email-details main-layout" v-if="email">

            <section class="actions">
                <span class="material-symbols-outlined">arrow_back</span>
            </section>

            <h1>{{ email.subject }}</h1>
            <img :src="imgUrl" alt="">
            <h2>{{ email.from }} </h2>

            <p>{{ email.body }}</p>

            <!-- <RouterLink :to="'/email/' + email.nextEmailId">Next mail</RouterLink> |
            <RouterLink :to="'/email/' + email.prevEmailId">Prev mail</RouterLink> | -->
            
            <RouterLink to="/email">Back to mail list</RouterLink>
        </section>
    `,

    data() {
        return {
            email: null,
            imgUrl: ''
        }
    },

    created() {
        this.loadEmail()
    },

    methods: {
        loadEmail() {
            const { emailId } = this.$route.params
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
    },

    // watch: {
    //     emailId() {
    //         this.loadEmail()
    //     },
    // },

    computed: {
        emailId() {
            return this.$route.params.emailId
        },
    },
}