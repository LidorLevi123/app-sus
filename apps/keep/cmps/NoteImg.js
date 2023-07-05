export default {
    props: ['info'],
    template: `
  <div class="note-img">
    <img :src="note.info.url" :alt="note.info.title" />
    <h3>{{ note.info.title }}</h3>
  </div>
    `,
    props: {
        note: Object,
    },
};