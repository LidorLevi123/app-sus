'use strict'

function createEventEmitter(defaultHandler = null) {
    const listenersMap = {}
    let isDarkMode = false
  
    return {
      on(evName, listener) {
        listenersMap[evName] = listenersMap[evName]
          ? [...listenersMap[evName], listener]
          : [listener]
        return () =>
          (listenersMap[evName] = listenersMap[evName].filter(
            (func) => func !== listener
          ))
      },
      emit(evName, payload) {
        if (listenersMap[evName])
          listenersMap[evName].forEach((listener) => listener(payload))
        else if (defaultHandler) defaultHandler()
      },
      toggleDarkMode() {
        isDarkMode = !isDarkMode
        this.emit('dark-mode-toggled', isDarkMode)
      },
      get isDarkMode() {
        return isDarkMode
      },
    }
  }
  


export const eventBus = createEventEmitter(() => console.log('No handler associated with this event...'))


export function showUserMsg(msg) {
    eventBus.emit('show-msg', msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({txt, type: 'success'})
}
export function showErrorMsg(txt) {
    showUserMsg({txt, type: 'error'})
}

export function toggleDarkMode() {
    eventBus.emit('toggle-dark-mode')
}