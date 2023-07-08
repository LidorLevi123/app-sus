import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
    <button class="dark-mode-button" @click="toggleDarkMode">
      <span v-if="isDarkMode" class="material-symbols-outlined">brightness_high</span>
      <span v-else class="material-symbols-outlined">brightness_low</span>
    </button>

    `,
 computed: {
    isDarkMode() {
      return eventBus.isDarkMode || false
    }
  },
  methods: {
    toggleDarkMode() {
      eventBus.toggleDarkMode()
    }
  }
}