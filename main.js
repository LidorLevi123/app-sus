const { createApp } = Vue

import { router } from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'
import BackDrop from './cmps/BackDrop.js'

const options = {
	template: `
        <section>
            <AppHeader />
            <RouterView />
            <AppFooter />
            <UserMsg />
            <BackDrop />
        </section>
    `,
	components: {
		AppHeader,
		AppFooter,
		UserMsg,
        BackDrop
	},
}

const app = createApp(options)
app.use(router)
app.mount('#app')
