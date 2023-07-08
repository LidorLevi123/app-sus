import { eventBus } from '../services/event-bus.service.js'

export default {
	template: `
        <section :class="msg.type" v-if="msg.txt" class="user-msg">
            {{ msg.txt }}
			<button @click="msg.txt = ''">Cancel</button>
			<span class="material-symbols-outlined" @click="msg.txt = ''">close</span>
        </section>
    `,
	data() {
		return {
			msg: { txt: '', type: 'success' },
		}
	},
	created() {
		eventBus.on('show-msg', this.showMsg)
	},
	methods: {
		showMsg(msg) {
			this.msg = msg
			setTimeout(() => (this.msg.txt = ''), this.msg.timeout || 3000)
		},
	},
}
