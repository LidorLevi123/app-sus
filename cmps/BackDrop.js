export default {
    template: `
        <section class="backdrop" @click="onCloseMenu"></section>
    `,

    methods: {
        onCloseMenu() {
            document.body.classList.remove('menu-open')
        }
    }
}
