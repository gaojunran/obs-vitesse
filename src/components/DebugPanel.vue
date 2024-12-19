<script setup lang="ts">

import {useSocketStore} from "~/stores/socket";

const socket = useSocketStore();
const status = computed(() => socket.status);
const data = computed(() => socket.data);
const isCaught = computed(() => socket.isCaught);

</script>

<template>
  <div p-4 max-w-max>
    <div text-white:50 transition hover:text-white>
      WebSocket Status:
    </div>
    <div font-mono
         :class="{ 'text-green-500': status === 'OPEN',  'text-red-500': status === 'CLOSED' }">
      {{ status }}
    </div>
    <div mt-4 text-white:50 transition hover:text-white>
      Latest Message:
    </div>
    <div text-white font-mono>
      {{ data || '...' }}
    </div>
    <div mt-4 text-white:50 transition hover:text-white v-show="data">
      Latest Message Caught or Not:
    </div>
    <div v-if="isCaught" i-typcn-tick text-green-500 p-0 m--1 mt-0 />
    <div v-else v-show="data" i-typcn-times p-0 m--1 mt-0 text-red-500/>

    <div mt-4 text-white:50 transition hover:text-white>
      Route:
    </div>
    <div text-white font-mono>
      {{ $route.path }}
    </div>
  </div>
</template>

<style scoped>

</style>
