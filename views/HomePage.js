export default {
    template: `
        
        <section class="home-page">
            <h1>
                Welcome to AppSus
                <br>
                Manage your life all in one place
            </h1>
            <div>
                <article @click="goTo('/email')">
                    <h2>Mail</h2>
                    <img src="assets/img/mail.png" alt="mail.png">
                    <p>Manage your mails</p>
                </article>

                <article @click="goTo('/note')">
                    <h2>Notes</h2>
                    <img src="assets/img/essay.png" alt="essay.png">
                    <p>Organize your notes</p>
                </article>

                <article @click="goTo('/books')">
                    <h2>Books</h2>
                    <img src="assets/img/book-stack.png" alt="book-stack.png">
                    <p>Browse your books</p>
                </article>
            </div>
        </section>
    `,

    methods: {
        goTo(route) {
            this.$router.push(route)
        }
    }
}
