export default {
    props: ['info'],
    template: `
 <div class="note-todos">
    <h3>{{ note.info.title }}</h3>
    <ul>
      <li v-for="todo in note.info.todos" :key="todo.txt">
        <input type="checkbox" :checked="todo.doneAt" disabled />
        <span>{{ todo.txt }}</span>
      </li>
    </ul>
  </div>
    `,
    props: {
        note: Object,
    },
};