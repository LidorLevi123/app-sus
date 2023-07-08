import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import booksJson from '../../../assets/json/books.json' assert {type: 'json'}

const BOOK_KEY = 'bookDB'

_createBooks()
_setBookNextPrevId()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    addReview,
}
window.bookService = bookService

function query() {
    return storageService.query(BOOK_KEY)
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = '') {
    return {
        id: '',
        title,
        subtitle: '',
        authors: [],
        publishedDate: null,
        description: '',
        pageCount: null,
        categories: [],
        thumbnail: 'http://coding-academy.org/books-photos/17.jpg',
        language: 'sp',
        listPrice: {
            amount: price,
            currencyCode: 'USD',
            isOnSale: true
        }
    }

}

function getFilterBy() {
    return { ...gFilterBy }
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []
            review.id = utilService.makeId()
            book.reviews.push(review)
            return save(book)
        })
}

function _setBookNextPrevId() {
    query()
        .then(books => {
            books.forEach((book, idx) => {
                if (idx !== books.length - 1) book.nextBookId = books[idx + 1].id
                else book.nextBookId = books[0].id

                if (idx !== 0) book.prevBookId = books[idx - 1].id
                else book.prevBookId = books[books.length - 1].id

            })
            utilService.saveToStorage(BOOK_KEY, books)
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksJson
        utilService.saveToStorage(BOOK_KEY, books)
    }
}