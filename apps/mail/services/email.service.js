import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'emailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createEmails(20)
_setEmailsNextPrevId()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
}

window.emailService = emailService
window.loggedinUser = loggedinUser

function query() {
    return storageService.query(EMAIL_KEY)
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

function getEmptyEmail() {
    return {
        id: '',
        type: '',
        category: '',
        subject: '',
        body: '',
        isRead: false,
        isChecked: false,
        sentAt: 0,
        removedAt: null,
        from: '',
        to: ''
    }
}

function _setEmailNextPrevId(email) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            const emailIdx = emails.findIndex(currEmail => currEmail.id === email.id)
            email.nextEmailId = emails[emailIdx + 1] ? emails[emailIdx + 1].id : emails[0].id
            email.prevEmailId = emails[emailIdx - 1]
                ? emails[emailIdx - 1].id
                : emails[emails.length - 1].id
            return email
        })
}

function _setEmailsNextPrevId() {
    query()
        .then(emails => {
            emails.forEach((email, idx) => {
                if (idx !== emails.length - 1) email.nextEmailId = emails[idx + 1].id
                else email.nextEmailId = emails[0].id

                if (idx !== 0) email.prevEmailId = emails[idx - 1].id
                else email.prevEmailId = emails[emails.length - 1].id
            })
            utilService.saveToStorage(EMAIL_KEY, emails)
        })
}

function _createEmails(amount) {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        for (let i = 0; i < amount; i++) {
            emails.push(_createEmail())
        }
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function _createEmail() {
    const email = getEmptyEmail()
    _addEmailDemoData(email)
    return email
}

function _addEmailDemoData(email) {
    const companies = [
        'Google', 'Apple', 'Microsoft', 'Amazon', 'Facebook', 'Twitter', 'LinkedIn', 'Netflix', 'Uber',
        'Airbnb', 'Dropbox', 'Slack', 'PayPal', 'Salesforce', 'Adobe', 'Oracle', 'IBM', 'Intel', 'HP', 'Dell'
    ]
    const messages = [
        'Dear customer, we have an important update regarding your account settings. Please review the changes and take any necessary action. Thank you.',
        'Thank you for your recent payment. This email confirms the successful completion of your payment transaction. If you have any questions, feel free to contact us.',
        'This is a friendly reminder that the upcoming event you registered for is just around the corner. We look forward to seeing you there!',
        'Hello, your account information has been updated. Please review the changes and verify that everything is accurate. If you did not make these changes, please contact our support team immediately.',
        'Great news! We have a special offer just for you. Don\'t miss out on this exclusive discount. Visit our website to learn more and take advantage of the offer.',
        'Dear customer, your recent order is being processed. Here\'s an update on the current status of your order. If you have any questions, please don\'t hesitate to reach out to our customer support.',
        'You are invited to join an upcoming webinar on an exciting topic. Save the date and register now to secure your spot. We look forward to your participation.',
        'Urgent action is required on your part. Please log in to your account and complete the requested task to avoid any interruptions to your services.',
        'Dear valued customer, we would like to extend our heartfelt thanks for your recent purchase. We appreciate your business and hope you enjoy your new item.',
        'We are updating our policy to better serve our customers. Please review the updated policy document at your earliest convenience.',
        'As a valued subscriber, we have an exclusive discount for you. Use the provided code during checkout to enjoy the special discount.',
        'Congratulations! You have achieved a significant milestone. Your hard work and dedication have paid off. Keep up the great work!',
        'Thank you for your recent job application. We are currently reviewing applications and will provide an update on your application status soon.',
        'We are excited to announce a new feature that has been added to our product. Log in to your account to explore the latest enhancements.',
        'Attention: A security alert has been detected regarding your account. Please review the details and take the necessary steps to secure your account.',
        'We value your feedback and would like to hear about your recent experience with our products and services. Your input helps us improve our offerings.',
        'Maintenance notice: Our services will be temporarily unavailable during the scheduled maintenance window. We apologize for any inconvenience caused.',
        'Your subscription is due for renewal. To continue enjoying uninterrupted access to our services, please renew your subscription before the expiration date.',
        'We invite you to participate in a survey to provide your valuable insights. Your feedback is crucial to help us better understand your needs and preferences.',
        'Exciting news! We are thrilled to announce the launch of our new product. Discover the features and benefits it offers by visiting our website.'
    ]
    const subjects = [
        'Important Update', 'Payment Confirmation', 'Event Reminder', 'Account Update', 'Special Offer', 'Order Status',
        'Webinar Invitation', 'Urgent Request', 'Thank You', 'Policy Update', 'Exclusive Discount', 'Congratulations',
        'Application Status', 'New Feature', 'Security Alert', 'Feedback Request', 'Maintenance Notice', 'Subscription Renewal',
        'Survey Invitation', 'Product Launch'
    ]

    const types = ['sent', 'inbox']
    const categories = ['starred', 'draft', 'trash']

    const randomTypeIdx = utilService.getRandomIntInclusive(0, types.length - 1)
    const randomToIdx = utilService.getRandomIntInclusive(0, companies.length - 1)
    const randomFromIdx = utilService.getRandomIntInclusive(0, companies.length - 1)
    const randomSubjectMsgIdx = utilService.getRandomIntInclusive(0, subjects.length - 1)
    const randomCategoryIdx = utilService.getRandomIntInclusive(0, categories.length - 1)

    email.id = utilService.makeId()
    email.to = companies[randomToIdx]
    email.from = companies[randomFromIdx]
    email.subject = subjects[randomSubjectMsgIdx]
    email.body = messages[randomSubjectMsgIdx]
    email.type = types[randomTypeIdx]
    email.category = categories[randomCategoryIdx]
    email.isRead = utilService.getRandomIntInclusive(1, 2) === 1 ? true : false
    email.sentAt = new Date(utilService.getRandomIntInclusive(new Date('2020').getTime(), new Date('2023').getTime())).getTime()
}
