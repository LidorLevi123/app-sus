export default {
	template: `
  <header class="app-header main-layout">
    <div class="left-section">
    <img class="logo-img" src="../assets/img/logo.png" alt="">
    </div>
    <div class="right-section">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/email">Email</router-link>
        <router-link to="/note">Notes</router-link>
      </nav>
    </div>
  </header>
    `,
}
