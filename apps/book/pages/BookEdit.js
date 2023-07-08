import { bookService } from "../../book/services/book.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    template: `
        <form @submit.prevent="save" class="book-edit">
            <h2> {{ (bookToEdit.id) ? 'Edit' : 'Add'}} Book</h2>
            <input v-model="bookToEdit.title" type="text" placeholder="Enter title">
            <input v-model.number="bookToEdit.listPrice.amount" type="number" placeholder="Enter price">
            <input v-model="bookToEdit.publishedDate" type="number" placeholder="Enter publish date">
            <input v-model="bookToEdit.description" type="text" placeholder="Enter description">
            <input v-model="bookToEdit.pageCount" type="number" placeholder="Enter page count">
            <hr />
            <RouterLink to="/book">Cancel</RouterLink> 
            <button :disabled="!isValid">Save</button>
        </form>
    `,
    data() {
        return {
            bookToEdit: bookService.getEmptyBook(),
        }
    },
    computed: {
        isValid() {
            return this.bookToEdit.title.length > 0
        }
    },
    created() {
        const { bookId } = this.$route.params
        
        if (!bookId) return
        bookService.get(bookId)
            .then(book => {
                this.bookToEdit = book
            })
            .catch(err => {
                showErrorMsg('Cannot load book for edit')
                this.$router.push('/book')
            })
    },

    methods: {
        save() {
            bookService.save(this.bookToEdit)
                .then(savedbook => {
                    showSuccessMsg('Book saved!')
                    this.$router.push('/book')
                })
                .catch(err => {
                    showErrorMsg('Cannot save book')
                })
        }
    }
}