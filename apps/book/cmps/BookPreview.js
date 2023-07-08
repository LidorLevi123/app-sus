export default {
    props: ['book'],

    template: `
        <article @click="goToDetailsPage" class="book-preview">
            <img :src="book.thumbnail" alt="">
            <img v-if="book.listPrice.isOnSale" class="img-sale" src="assets/img/sale.png" alt="">
        </article>
    `,

    methods: {
        goToDetailsPage() {
            this.$router.push(`/book/details/${this.book.id}`)
        }
    }
}