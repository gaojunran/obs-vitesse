<script lang="ts" setup>

const { status, data, send, open, close } = useWebSocket('ws://localhost:8080')

watch(data, (data, _) => {
  console.log(data.value);
})

const state = (value: any) => {

}
</script>

<template>
<!--  <nav mt-6 inline-flex gap-2 text-xl>-->
<!--    <button icon-btn @click="toggleDark()">-->
<!--      <div i-carbon-sun dark:i-carbon-moon />-->
<!--    </button>-->

<!--    <a-->
<!--      i-carbon-logo-github icon-btn-->
<!--      rel="noreferrer"-->
<!--      href="https://github.com/antfu-collective/vitesse-lite"-->
<!--      target="_blank"-->
<!--      title="GitHub"-->
<!--    />-->
<!--  </nav>-->
  <div fixed bottom-0 w-full h-20 p-4
       class="bg-gradient-to-r from-indigo-500:50 from-10% via-sky-500:50 via-30% to-emerald-500:50 to-90%"
  >
    <div>

    </div>
    <span font-bold font-mono>obs-vitesse</span>
    <span> - A template of OBS Studio packaging. </span>
    <div flex>
      <div text-white:50 transition hover:text-white>
        WebSocket Status:
      </div>
      <div ml-2 px-1 rounded text-white:50 hover:text-white transition
           :class="{ 'bg-green-500:50': status === 'OPEN',  'bg-red-500:50': status === 'CLOSED' }">
        {{ status }}
      </div>
      <div fixed right-2 bg-amber>
        {{data || 'No data now'}}
      </div>
    </div>




  </div>

</template>
