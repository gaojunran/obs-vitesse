<script lang="ts" setup>
import {useStateStore} from "~/stores/states";

const states = useStateStore();

// always use `computed` to avoid reactivity issues, or just use `states.counter` directly
const counter = computed(() => states.counter);
</script>

<template>
  <div fixed bottom-0 w-full h-20 p-4 flex justify-between
       class="bg-gradient-to-r from-indigo-500:50 from-10% via-sky-500:50 via-30% to-emerald-500:50 to-90%"
  >
    <div>
      <span font-bold font-mono>obs-vitesse</span>
      <span> - A template of OBS Studio packaging. </span>
      <div flex>
        <div text-white:50 hover:text-white transition font-sans>
          Press
          <span font-mono bg-white:10 px-1 rounded>Space</span>
          to toggle Debug Panel.
        </div>
      </div>
    </div>
    <div>
      <div>counter</div>
      <div text-align-right text-lg>{{counter}}</div>
    </div>





  </div>

</template>
