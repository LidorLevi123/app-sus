export default {
    template: `
        
        <section class="home-page">
            <h1>
                You can manage your life all in one place!
                <br><br>
                Only available in AppSus, best app on the market 
            </h1>
        <div>
            <article @click="goTo('/email')">
            <h2>Mail</h2>
            <img src="assets/img/gmail.png" alt="gmail.png">
            <p>Manage your mails</p>
            </article>
            

            <article @click="goTo('/keep')">
            <h2>Notes</h2>
            <img src="assets/img/sticky-notes2.png" alt="sticky-notes.png">
            <p>Organize your notes</p>
            </article>

            <article @click="goTo('/books')">
            <h2>Books</h2>
            <img src="assets/img/books.png" alt="books">
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
