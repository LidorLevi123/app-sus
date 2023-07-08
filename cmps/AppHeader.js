export default {
  template: `
  <header class="app-header main-layout">
    <div class="left-section">
      <img class="logo-img" src="assets/img/logo.png" alt="logo.png" @click="goTo('/')">
    </div>
    <div class="right-section">
      <div class="menu-icon" @click="toggleMenu">
      <span class="material-symbols-outlined">apps</span>
      </div>
      <div class="menu-overlay" :class="{ active: showMenu }">
        <nav class="menu">
          <router-link title="Mail" to="/email" @click="closeMenu"><img src="assets/img/mail.png" alt=""></router-link>
          <router-link title="Notes" to="/note" @click="closeMenu"><img src="assets/img/essay.png" alt=""></router-link>
          <router-link title="Books" to="/book" @click="closeMenu"><img src="assets/img/book-stack.png" alt=""></router-link>
          <router-link title="Home" to="/" @click="closeMenu"><img src="assets/img/home.png" alt=""></router-link>
          <router-link title="About" to="/about" @click="closeMenu"><img src="assets/img/about.png" alt=""></router-link>
        </nav>
      </div>
    </div>
  </header>
    `,

  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    goTo(route) {
      this.$router.push(route)
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    closeMenu() {
      this.showMenu = false
    }
  }
}