<script setup lang="ts">

import {useSocketStore} from "~/stores/socket";

const socket = useSocketStore();
const status = computed(() => socket.status);
const data = computed(() => socket.data);
const state = (value: any) => {

}
</script>

<template>
  <div p-4 max-w-max>
    <div text-white:50 transition hover:text-white>
      WebSocket Status:
    </div>
    <div rounded font-bold font-mono
         :class="{ 'text-green-500': status === 'OPEN',  'text-red-500': status === 'CLOSED' }">
      {{ status }}
    </div>
    <div mt-4 text-white:50 transition hover:text-white>
      Latest Message:
    </div>
    <div text-white>
      {{ data || '...' }}
    </div>
    <div mt-4 text-white:50 transition hover:text-white>
      Route:
    </div>
    <div text-white>
      {{ $route.path }}
    </div>
  </div>
</template>

<style scoped>

</style>
