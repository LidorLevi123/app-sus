export default {
    props: ['collab'],

    template: `
        <!-- <article class="about-preview">
            <h2>{{ collab.name }}</h2>
            <img :src="imgSrc" alt="Image 1">
            <p>{{ collab.desc }}</p>
            <a title="github link" :href="gitLink">
                <img src="assets/img/github.png" alt="GitHub"></a>
        </article> -->
        <article class="about-preview">
            <div class="inner">
                <div class="front">
                    <p class="title">{{ collab.name }}</p>
                </div>
                <div class="back">
                    <p class="title">{{ collab.desc }}</p>
                    <a title="github link" :href="gitLink">
                        <img src="assets/img/github.png" alt="GitHub"></a>
                </div>
            </div>
        </article>
      `,

    computed: {
        imgSrc() {
            return `https://robohash.org/${this.collab.name}.png`
        },
        gitLink() {
            return `https://github.com/${this.collab.gitUserName}`
        }
    }
}

