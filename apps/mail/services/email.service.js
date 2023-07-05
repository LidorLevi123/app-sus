import { utilService } from '../../../services/util.service'
import { storageService } from '../../../services/async-storage.service'

// const PAGE_SIZE = 5
const EMAIL_KEY = 'emailDB'

var gFilterBy = {}
var gSortBy = {}
var gPageIdx

_createEmails()
// _setemailNextPrevId()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getNextEmailId,
    getFilterBy,
    setFilterBy,
}
window.emailService = emailService

function query() {
    return storageService.query(EMAIL_KEY).then(emails => {
        // if (gFilterBy.txt) {
        //     const regex = new RegExp(gFilterBy.txt, 'i')
        //     emails = emails.filter(email => regex.test(email.vendor))
        // }
        // if (gFilterBy.minSpeed) {
        //     emails = emails.filter(email => email.maxSpeed >= gFilterBy.minSpeed)
        // }
        // if (gPageIdx !== undefined) {
        //     const startIdx = gPageIdx * PAGE_SIZE
        //     emails = emails.slice(startIdx, startIdx + PAGE_SIZE)
        // }
        // if (gSortBy.maxSpeed !== undefined) {
        //     emails.sort(
        //         (c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed
        //     )
        // } else if (gSortBy.vendor !== undefined) {
        //     emails.sort(
        //         (c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor
        //     )
        // }

        return emails
    })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getEmptyEmail(subject = '') {
    return {
        id: '',
        subject,
        body: '',
        isRead: false,
        sentAt: 0,
        removedAt: null,
        from: '',
        to: ''
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.subject !== undefined) gFilterBy.subject = filterBy.subject
    if (filterBy.isRead !== undefined) gFilterBy.isRead = filterBy.isRead
    return gFilterBy
}

function getNextEmailId(emailId) {
    return storageService.query(EMAIL_KEY).then(emails => {
        var idx = emails.findIndex(email => email.id === emailId)
        if (idx === emails.length - 1) idx = -1
        return emails[idx + 1].id
    })
}

function _setEmailNextPrevId() {
    query()
        .then(emails => {
            emails.forEach((email, idx) => {
                if (idx !== emails.length - 1) email.nextemailId = emails[idx + 1].id
                else email.nextemailId = emails[0].id

                if (idx !== 0) email.prevemailId = emails[idx - 1].id
                else email.prevemailId = emails[emails.length - 1].id

            })
            utilService.saveToStorage(EMAIL_KEY, emails)
        })
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(_createEmail('Programming'))
        emails.push(_createEmail('Food'))
        emails.push(_createEmail('Cars'))
        emails.push(_createEmail('Purchase'))
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function _createEmail(subject) {
    const email = getEmptyEmail(subject)
    email.id = utilService.makeId()
    email.body = utilService.makeLorem(utilService.getRandomIntInclusive(30, 50))
    return email
}
