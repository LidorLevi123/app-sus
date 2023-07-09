import AboutPreview from "../cmps/AboutPreview.js"

export default {
    template: `
        <section class="about-page">
            <header>About us</header>
                <div class="about-container">
                    <AboutPreview :collab="collab1"/>
                    <AboutPreview :collab="collab2"/>
                </div>
        </section>
    `,

    data() {
        return {
            collab1: this.getCollab('Lidor'),
            collab2: this.getCollab('Sergei')
        }
    },

    methods: {
        getCollab(name) {
            const collab = { name }
            switch (name) {
                case 'Lidor':
                    collab.gitUserName = 'LidorLevi123'
                    collab.desc = 'Working with Sergei was an absolute pleasure.' +
                    ' His dedication and expertise brought a unique perspective to our project.' +
                    ' Together, we seamlessly combined our skills and ideas, resulting in a truly remarkable' +
                    'outcome that exceeded all expectations.'
                    break
                case 'Sergei':
                    collab.gitUserName = 'StrukovSergei'
                    collab.desc = 'It was an incredible experience collaborating with Lidor on this project.' +
                    ' His creativity and attention to detail added immense value to our work.' +
                    ' Throughout the process, we fostered a strong synergy, inspiring each other to push boundaries ' +
                    'and achieve outstanding results. I\'m grateful for the opportunity to have ' +
                    'worked alongside such a talented professional.'
                    break
            } 
            return collab      
        },
    },

    components: {
        AboutPreview
    }
}
