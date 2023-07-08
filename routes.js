import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import EmailIndex from './apps/mail/pages/EmailIndex.js'
import EmailList from './apps/mail/cmps/EmailList.js'
import EmailDetails from './apps/mail/pages/EmailDetails.js'

import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import NoteAdd from './apps/keep/cmps/NoteAdd.js'

import BookIndex from './apps/book/pages/BookIndex.js'
import BookDetails from './apps/book/pages/BookDetails.js'
import BookEdit from './apps/book/pages/BookEdit.js'


const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),

	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/email',
			component: EmailIndex,
			children: [
				{
					path: '',
					component: EmailList,
				},
				{
					path: 'details/:emailId',
					component: EmailDetails,
				},
			]
		},
		{
			path: '/note',
			component: NoteIndex,
			children: [
				{
					path: '/note/add',
					component: NoteAdd,
				},
				{
					path: 'details/:noteId',
					component: NoteDetails,
				},
			]
		},
		{
			path: '/book',
			component: BookIndex,
			children: [
				{
					path: '/details/:bookId',
					component: BookDetails,
				},
				{
					path: '/edit/:bookId?',
					component: BookEdit,
				},
			]
		},
	],
}


export const router = createRouter(routerOptions)
