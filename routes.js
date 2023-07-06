import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import EmailIndex from './apps/mail/pages/EmailIndex.js'
import EmailList from './apps/mail/cmps/EmailList.js'
import EmailDetails from './apps/mail/pages/EmailDetails.js'

import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import NoteEdit from './apps/keep/pages/NoteEdit.js'

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
					path: 'details/:noteId',
					component: NoteDetails,
				},
			]
        },
	],
}

export const router = createRouter(routerOptions)
