<template>
  <DebugPanel v-show="isPanelShown"/>
  <RouterView />
</template>

<script setup>
import { onKeyStroke } from '@vueuse/core'
import { useSocketStore } from "~/stores/socket";
import { parseMsg } from "~/utils/parse";
import { useStateStore } from "~/stores/states";

const isPanelShown = ref(false);
const socket = useSocketStore();
const states = useStateStore();
const router = useRouter();
const msg = computed(() => socket.data);  // attribute of pinia store is generally not reactive

onKeyStroke(' ', (event) => {
  event.preventDefault();
  console.log("Debug Panel toggled.")
  isPanelShown.value = !isPanelShown.value;
});

watch(msg, (msg, _) => {
  socket.isCaught = parseMsg(msg, states, router);
  if (!socket.isCaught) {
    console.log("Failed to parse: ", msg)
    socket.send(JSON.stringify(
      {"status": "failed", "payload": msg}
    ))
  } else {
    console.log("Successfully parsed: ", msg)
    socket.send(JSON.stringify(
      {"status": "success", "payload": msg}
    ))
  }
}, )

</script>
