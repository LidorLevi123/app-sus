import { bookService } from "../../book/services/book.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    props: ['book'],

    template: `
    <section class="add-review">
        <h1>Review This Book!</h1>
        <form @submit.prevent="addReview">
            <label for="name">Name:</label>
            <input  v-model="review.name" type="text" id="name" name="name"><br>

            <label for="rate">Rate:</label>
            <select v-model="review.rate" id="rate" name="rate">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <label for="more">Tell us more about your experience: </label>
            <textarea v-model="review.more" id="more" name="more"></textarea>

            <button>Save!</button>
        </form>
    </section>
    `,

    data() {
        return {
            review: {
                name: '',
                rate: 0,
                more: '',
            }
        }
    },

    methods: {
        addReview() {
            bookService.addReview(this.book.id, this.review)
                .then(() => showSuccessMsg('Thank you for your review!'))
                .catch(() => showErrorMsg('Something went wrong with your review.'))
        },
        resetReview() {
            this.review = {
                name: '',
                rate: 0,
                more: '',
            }
        }
    }
}