import {defineStore} from 'pinia';

const {status, data, send} = useWebSocket('ws://localhost:8080');

export const useSocketStore = defineStore('socket', {
  state: () => {
    return {
      status,
      data,
      isCaught: false
    }
  },
  actions: {
    send
  }
});
