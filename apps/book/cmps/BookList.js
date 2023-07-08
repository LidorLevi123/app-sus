import BookPreview from '../cmps/BookPreview.js'

export default {
    props: ['books'],

    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books">
                    <BookPreview :book="book"/>
                    <section class="actions">
                        <button title="Remove Book" class="btn-remove" @click="onRemoveBook(book.id)">✖</button>
                        <button title="Edit Book" class="btn-edit" @click="onEditBook(book.id)">🖊</button>
                    </section>
                </li>
            </ul>
        </section>
    `,

    methods: {
        onRemoveBook(bookId) {
            this.$emit('remove', bookId)
        },
        onEditBook(bookId) {
            this.$router.push(`/book/edit/${bookId}`)
        }
    },

    components: {
        BookPreview,
    }
}